import { RequireAuth } from "@iatickets-dev/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";
import { OrderStatus } from '@iatickets-dev/common'

const router = express.Router();

// get a list of users orders
router.get("/api/orders", RequireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");

  const currentOrders = orders.filter(order => order.status === OrderStatus.Created || order.status === OrderStatus.AwaitingPayment )

  const prevOrders = orders.filter(order => order.status === OrderStatus.Complete)
  
  
  res.send({currentOrders, prevOrders});
});

export { router as indexOrderRouter };
