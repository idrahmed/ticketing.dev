import express, { Request, Response } from "express";
import { NotFoundError } from "@iatickets-dev/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

// getting a ticketing by id

router.get(`/api/tickets/:id`, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  // if ticket doesn't exist, throw error
  if (!ticket) {
    throw new NotFoundError();
  }
  res.send(ticket);
});

export { router as showTicketRouter };
