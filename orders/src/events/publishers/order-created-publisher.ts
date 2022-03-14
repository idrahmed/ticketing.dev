import { Publisher, OrderCreatedEvent, Subjects } from '@iatickets-dev/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}