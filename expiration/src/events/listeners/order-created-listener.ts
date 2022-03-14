import { Listener, OrderCreatedEvent, Subjects } from "@iatickets-dev/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";

// this listener listens to newly created orders. We are going to only send the data to the expirationQueue after the delay is up 
// which in this case is the 15 minutes a user has to purchase the ticket.

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    // listening to order created channel
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    // remember this is so we only communicate to one instance 
    queueGroupName = queueGroupName

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const delay = new Date(data.expiresAt).getTime() - new Date().getTime()
        // adding the orderId of the new incoming order id to the expiration queue only after the time delay which is 15 minutes.
        await expirationQueue.add({
            orderId: data.id
        }, 
        {
            delay
        }
        )

        msg.ack()
    }
}