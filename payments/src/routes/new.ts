import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  RequireAuth,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@iatickets-dev/common";
import { Order } from "../models/order";
import { stripe } from "../stripe";
import { Payment } from "../models/payment";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

// we require the user to be logged in, the stripe token from the browser and an orderId
router.post(
  "/api/payments",
  RequireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    // find the order thats being bought
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }
    // make sure the userId on the order is equal to the incoming userId.
    if (order.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }
    // if the order status is already expired or cancelled, then throw error. 
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Order is expired/cancelled");
    }

    // create the stripe charge
    const charge = await stripe.charges.create({
      currency: "usd",
      amount: order.price * 100,
      source: token,
    });

    // include this payment in the db
    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });

    await payment.save();

    // now publish that this order is paid for and completed. 
    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ id: payment.id });
  }
);

export { router as createChargeRouter };
