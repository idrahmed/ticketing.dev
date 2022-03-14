import { Publisher, Subjects, TicketUpdatedEvent } from '@iatickets-dev/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}