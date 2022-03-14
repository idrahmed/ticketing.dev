import { OrderStatus } from "@iatickets-dev/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { Payment } from "../../models/payment";
import { stripe } from "../../stripe";

it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "dfdsfsf",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns a 401 when purchasing an order that does not belong to the user", async () => {
  // first build an order
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    price: 300,
  });

  await order.save();

  // now lets try to pay for that order with a different user id than on the order object.
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin())
    .send({
      token: "dfdsfsf",
      orderId: order.id,
    })
    .expect(401);
});

it("returns a 400 when purchasing an cancelled/expired order", async () => {
  // first build an order
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Cancelled,
    price: 300,
  });

  await order.save();

  // now lets try to pay for that order with a different user id than on the order object.
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(order.userId))
    .send({
      token: "dfdsfsf",
      orderId: order.id,
    })
    .expect(400);
});

it("returns a 201 with valid inputs", async () => {
  const price = Math.floor(Math.random() * 100000);

  // building an order
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    price,
  });

  await order.save();

  // now lets try to pay for that order
  await request(app)
    .post("/api/payments")
    .set("Cookie", global.signin(order.userId))
    .send({
      token: "tok_visa",
      orderId: order.id,
    })
    .expect(201);

    // get back the 10 recent charges we created from stripe
  const stripeCharges = await stripe.charges.list({ limit: 10 });

  // check if there is a charge for an order with the randomly generated price 
  const stripeCharge = stripeCharges.data.find(
    (charge) => charge.amount === price * 100
  );

  // expect that charge to exist.
  expect(stripeCharge).toBeDefined()

  // finding that payment 
  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: stripeCharge?.id
  })

  // we need to use toBeNull because payment is either going to be a payment or null
  expect(payment).not.toBeNull()
});
