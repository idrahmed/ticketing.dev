import { Publisher, PaymentCreatedEvent, Subjects } from '@iatickets-dev/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.Paymentcreated = Subjects.Paymentcreated
}