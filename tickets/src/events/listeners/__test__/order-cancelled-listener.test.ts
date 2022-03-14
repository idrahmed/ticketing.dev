import { OrderCancelledEvent, OrderStatus } from "@iatickets-dev/common";
import mongoose from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCancelledListener(natsWrapper.client);

  // create and save a ticket
  const ticket = Ticket.build({
    title: "game",
    price: 99,
    userId: "dfsdf",
  });

  // set orderId property on the ticket when ticket is ordered

  const orderId = new mongoose.Types.ObjectId().toHexString();
  ticket.set({ orderId });

  await ticket.save();

  // create the fake event where we cancel the order
  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    ticket: {
      id: ticket.id,
    },
    version: 0,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg, orderId };
};


it('updates the ticket orderId to be undefined and publishes an event', async() => {
    const { msg, data, ticket, orderId, listener } = await setup()
    await listener.onMessage(data, msg)

    const updatedTicket = await Ticket.findById(ticket.id)

    expect(updatedTicket?.orderId).toBeUndefined()
    expect(natsWrapper.client.publish).toHaveBeenCalled()
})
