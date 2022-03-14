import { Listener, OrderCancelledEvent, Subjects } from "@iatickets-dev/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    // Find the ticket that the order is cancelling
    const ticket = await Ticket.findById(data.ticket.id);
    // if no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    // set the orderId property to undefined now since the order has been cancelled
    ticket.set({ orderId: undefined });
    // save the ticket
    await ticket.save();
    // once we've updated the ticket locally, we also want to emit these changes to
    // our replica ticket db in orders service so we will publish the update.
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      userId: ticket.userId,
      title: ticket.title,
      price: ticket.price,
      orderId: ticket.orderId,
    });
    // ack the message
    msg.ack();
  }
}
