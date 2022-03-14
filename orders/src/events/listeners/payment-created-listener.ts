import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus,
} from "@iatickets-dev/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.Paymentcreated = Subjects.Paymentcreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    // find the order that has been paid for
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    // set the order status to complete now
    order.set({
      status: OrderStatus.Complete,
    });

    await order.save();

    msg.ack();
  }
}
