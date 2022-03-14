import { Publisher, Subjects, TicketCreatedEvent } from '@iatickets-dev/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}