import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "fdfgfdg",
      price: 50,
      desc: 'dsfdsf'
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "fdfgfdg",
      price: 50,
      desc: 'dsfdsf'
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  // first lets create a ticket
  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", global.signin())
    .send({
      title: "fdfgfdg",
      price: 50,
      desc: 'dsfdsf'
    });

  // now lets try editing that ticket with a different user
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "dfdsfdsf",
      price: 200,
      desc: 'dsfdsf'
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  // first lets create a ticket
  const cookie = global.signin();

  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", cookie)
    .send({
      title: "fdfgfdg",
      price: 50,
      desc: 'dsfdsf'
    });

  // now lets try editing that ticket with the same user but invalid inputs
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 130,
      desc: 'dsfdsf'
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "myticket",
      price: -130,
      desc: 'dsfdsf'
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  // first lets create a ticket
  const cookie = global.signin();

  const newTitle = "updated_ticket";
  const newPrice = 130;
  const newDesc = 'updated desc'

  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", cookie)
    .send({
      title: "old_ticket",
      price: 50,
      desc: 'dsfdsf'
    });

  // now lets try editing that ticket with the same user with valid inputs
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: newTitle,
      price: newPrice,
      desc: newDesc
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual(newTitle);
  expect(ticketResponse.body.price).toEqual(newPrice);
  expect(ticketResponse.body.desc).toEqual(newDesc);
});

it("publishes an updated event", async () => {
  const cookie = global.signin();

  const newTitle = "updated_ticket";
  const newPrice = 130;
  const newDesc = 'updated desc'

  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", cookie)
    .send({
      title: "old_ticket",
      price: 50,
      desc: 'dfsdf'
    });

  // now lets try editing that ticket with the same user with valid inputs
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: newTitle,
      price: newPrice,
      desc: newDesc
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects updates if ticket is reserved", async () => {
  const cookie = global.signin();

  const newTitle = "updated_ticket";
  const newPrice = 130;
  const newDesc = 'updated desc'

  // create a ticket to be updated
  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", cookie)
    .send({
      title: "old_ticket",
      price: 50,
      desc: 'dssdfsd'
    });

  // set orderId property on ticket to mimic it being reserved
  const ticket = await Ticket.findById(response.body.id);
  ticket?.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket?.save();

  // now lets try editing that ticket. We should expect a bad request response since the ticket is reserved
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: newTitle,
      price: newPrice,
      desc: newDesc
    })
    .expect(400);
});
