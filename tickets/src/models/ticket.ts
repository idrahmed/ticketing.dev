import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

// arguments we need to provide to build a ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
  desc: string;
}

// shape of a ticket instance/document in db
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
  desc: string
}

// properties to construct the ticket
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// schema of the ticket
const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
    },
    desc: {
      type: String
    }
  },
  {
    // remapping the json obj that mongo sends back. We don't want to return back we want _id to be id
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// using the plugin to increment version of ticket
ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
