import mongoose from "mongoose";
import express, { Request, Response } from "express";
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  RequireAuth,
  validateRequest,
} from "@iatickets-dev/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

// 15 minutes
const EXPIRATION_WINDOW_SECONDS = 15 * 60;

// making sure the ticketId is of a mongo Id type and not just any random string like 'abc'

router.post(
  "/api/orders",
  RequireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    // find the ticket the user is trying to order in the db
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }

    // checking if ticket has already been reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError("Ticket already reserved");
    }

    // calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
    // build the order and save it to the db
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();
    
    // publish an event saying that an order was created
    // this will be listened to in the ticket service which will set the ticket's orderId and thereby lock the ticket.
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status as OrderStatus,
      userId: order.userId, 
      expiresAt: order.expiresAt.toISOString(), 
      ticket: {
        id: ticket.id,
        price: ticket.price
      }
    })

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
