import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Order, OrderStatus } from "./order";

// params needed to create a ticket
interface TicketAttrs {
  id: string;
  title: string;
  price: number;
  desc: string;
}

// how a ticket instance is saved in the db
export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  desc: string;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  // build function to build a ticket
  build(attrs: TicketAttrs): TicketDoc;
  // fn to find ticket based on id and appropriate version number
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<TicketDoc | null>;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

// here we specify our methods on our Ticket model
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
    desc: attrs.desc
  });
};
ticketSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

// ading an isReserved method to the ticket document instance directly to see if the ticket has already been ordered.
ticketSchema.methods.isReserved = async function () {
  // this === the ticket document that we just called isReserved on (ticket the user is ordering )
  const existingOrder = await Order.findOne({
    // checking if ticket we pass in is equal to ticket in an existing order
    ticket: this,
    // only include orders that have an orderstatus of created, awaiting:payment or complete
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
