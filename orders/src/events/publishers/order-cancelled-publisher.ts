import { Publisher, OrderCancelledEvent, Subjects } from '@iatickets-dev/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}