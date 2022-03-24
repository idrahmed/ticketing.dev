import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import {
  NotFoundError,
  validateRequest,
  RequireAuth,
  NotAuthorizedError,
  BadRequestError,
} from "@iatickets-dev/common";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  RequireAuth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ min: 1 })
      .withMessage("price must be greater than 0"),
      body("desc").notEmpty().withMessage("Description is required")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    // if ticket doesn't exist, throw error
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    // if there is an orderId on the ticket, it means someone has ordered it and so we can allow 
    // owner of ticket to make changes to it
    if (ticket.orderId) {
      throw new BadRequestError('Cannot edit a reserved ticket')
    }

    // else now lets make the update
    ticket.set({
      title: req.body.title,
      price: req.body.price,
      desc: req.body.desc
    });

    await ticket.save();
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      userId: ticket.userId,
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      desc: ticket.desc,
      version: ticket.version
    });
    res.send(ticket);
  }
);

export { router as updateTicketRouter };
