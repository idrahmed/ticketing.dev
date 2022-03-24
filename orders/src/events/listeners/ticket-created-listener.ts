import { Message } from 'node-nats-streaming'
import { Subjects, Listener, TicketCreatedEvent } from '@iatickets-dev/common'
import { Ticket } from '../../models/ticket'
import { queueGroupName } from './queue-group-name'

// this listener listends to new tickets created in the ticket service. 
// whenever a new ticket is created we will replicate it locally in the order service. 

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated
    queueGroupName = queueGroupName
    // replicating newly created ticket.
    async onMessage(data: TicketCreatedEvent['data'], msg: Message) {   
        const { title, price, id, desc } = data
        const ticket = Ticket.build({
            id, title, price, desc
        })
        const saveTicket = await ticket.save()
        console.log('ticket: ', ticket)
        console.log('saveTicket: ', saveTicket)
        // acknowledge that we have successfully built and saved our ticket. 
        msg.ack()
    }
}