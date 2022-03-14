import { Subjects, Publisher, ExpirationCompleteEvent } from '@iatickets-dev/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete

    
}