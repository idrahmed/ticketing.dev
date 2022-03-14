import { Listener, OrderCreatedEvent, Subjects } from "@iatickets-dev/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { queueGroupName } from "./queue-group-name";

// this listener will listen to new orders created and will lock down the ticket
// associated with the order

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  // listens to the order:created channel.
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  // we get the data of the order created as well as the msg property on nats.
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    // if no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    // mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });
    // save the ticket
    await ticket.save();
    // once we've updated the ticket locally, we also want to emit these changes to
    // our replica ticket db in orders service so we will publish the updated version.
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
