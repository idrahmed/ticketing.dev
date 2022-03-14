import express, { Request, Response } from "express";
import { body } from "express-validator";
import { RequireAuth, validateRequest } from "@iatickets-dev/common";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

// creating a ticket endpoint

const router = express.Router();

router.post(
  "/api/tickets",
  RequireAuth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("price").isFloat({min: 1}).withMessage("price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body
    // build this ticket 
    const ticket = Ticket.build({
      title, 
      price, 
      userId: req.currentUser!.id
    })
    // save to our local Ticket db
    await ticket.save()
    // now publish this event so the ticket db in our orders service can add this ticket doc.
    // make sure to use the values from the create ticket and not the raw user inputs. 
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      userId: ticket.userId,
      price: ticket.price
    })
    res.status(201).send(ticket)
  }
);

export { router as createTicketRouter };
