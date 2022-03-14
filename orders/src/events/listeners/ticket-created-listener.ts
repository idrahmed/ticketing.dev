import { Message } from 'node-nats-streaming'
import { Subjects, Listener, TicketCreatedEvent } from '@iatickets-dev/common'
import { Ticket } from '../../models/ticket'
import { queueGroupName } from './queue-group-name'

// this listener listends to new tickets created in the ticket service. 
// whenever a new ticket is created we will replicate it locally in the order service. 

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated
    queueGroupName = queueGroupName
    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {   
        const { title, price, id } = data
        const ticket = Ticket.build({
            id, title, price
        })
        await ticket.save()
        // acknowledge that we have successfully built and saved our ticket. 
        msg.ack()
    }
}