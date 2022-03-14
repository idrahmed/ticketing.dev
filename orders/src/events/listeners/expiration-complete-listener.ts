import {
  Listener,
  ExpirationCompleteEvent,
  Subjects,
  OrderStatus,
} from "@iatickets-dev/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { queueGroupName } from "./queue-group-name";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: ExpirationCompleteEvent["subject"] = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    // find our order and ticket that it references.
    const order = await Order.findById(data.orderId).populate("ticket");
    if (!order) {
      throw new Error("Order not found");
    }

    // if the order status is already completed (paid for) return early. We do not want to expire 
    // an order thats completed 
    if(order.status === OrderStatus.Complete) {
      return msg.ack()
    }
    // set the order's status to cancelled.
    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    // now publish the expiration event. This will be listened to in the ticket db which will set orderId to undefined
    // and thereby unlocking the ticket.
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    msg.ack();
  }
}
