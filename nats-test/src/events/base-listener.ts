import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects
  data: {}
}

export abstract class Listener<T extends Event> {
  // channel to listen to
  abstract subject: T['subject'];
  // request will only go to one instance in our group
  abstract queueGroupName: string;
  // cb fun when message is emitted
  abstract onMessage(data: T['data'], msg: Message): void;
  
  private client: Stan;
  protected ackWait = 5 * 1000;

  // we want to make sure to pass in a client connection.
  constructor(client: Stan) {
    this.client = client;
  }

  // setManualAckMode allows us to manually acknowledge that a message has been successfully sent through
  // setDeliverAllAvailable allows a new service to get a history of all emitted messages.
  // setDurableName creates a durable subscription which allows us to determine which messages have been successfully emitted.
  // this is great if a service goes down, then those messages that haven't been emitted will proceed to do so.

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  // the actual subscribe method 
  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8"));
  }
}
