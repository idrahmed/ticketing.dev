import express from "express";
import { currentUser } from "@iatickets-dev/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  // the currentUser middleware will decode the jwt session token and return back a user or null.
  res.send({currentUser: req.currentUser || null});
});

export { router as currentUserRouter };
