import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFoundError } from "@iatickets-dev/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { IndexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = express();
// trusting the ingress nginx proxy
app.set('trust proxy', true)
app.use(express.json());
app.use(cookieSession({
  secure: process.env.NODE_ENV !== 'test',
  signed: false
}))

app.use(currentUser)
app.use(createTicketRouter)
app.use(IndexTicketRouter)
app.use(showTicketRouter)
app.use(updateTicketRouter)


app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }