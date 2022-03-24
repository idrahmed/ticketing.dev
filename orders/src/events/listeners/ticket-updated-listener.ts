import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  TicketUpdatedEvent,
} from "@iatickets-dev/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

// this listener listends to updates on tickets in the ticket service.
// whenever a new ticket is updated we will replicate it locally in the order service.

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    // find the ticket based on both the id and version being 1 less than the new one.
    const ticket = await Ticket.findByEvent(data)

    // if ticket doesnt exist, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // update the ticket
    const { title, price, desc } = data;
    ticket.set({
      title,
      price,
      desc
    });

    // save the ticket
    await ticket.save();

    // ack everything is successful 

    msg.ack()
  }
}
