import { Subjects } from './subjects'

// shape of our ticket created event

export interface TicketCreatedEvent {
    readonly subject: Subjects.TicketCreated
    data: {
        id: string
        title: string
        price: number
    }
}