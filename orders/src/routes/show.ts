import {
  NotAuthorizedError,
  NotFoundError,
  RequireAuth,
} from "@iatickets-dev/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

// get data for a specific order for a specific user

router.get(
  "/api/orders/:orderId",
  RequireAuth,
  async (req: Request, res: Response) => {

    // since our order model references the ticket model, we can use populate to 
    // merge the ticket data with our order.
    const order = await Order.findById(req.params.orderId).populate("ticket");

    // if order doesnt exist return not found error
    if (!order) {
      throw new NotFoundError();
    }

    // if the userId on the order is not equal to the users id sending the request, 
    // then the client is not authorised to look at that order
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };
