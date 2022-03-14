import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFoundError } from "@iatickets-dev/common";
import { createChargeRouter } from "./routes/new";

const app = express();
// trusting the ingress nginx proxy
app.set('trust proxy', true)
app.use(express.json());
app.use(cookieSession({
  secure: process.env.NODE_ENV !== 'test',
  signed: false
}))

app.use(currentUser)
app.use(createChargeRouter)

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }