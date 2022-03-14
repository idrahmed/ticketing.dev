import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFoundError } from "@iatickets-dev/common";
import { deleteOrderRouter } from "./routes/delete";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes";
import { newOrderRouter } from "./routes/new";

const app = express();
// trusting the ingress nginx proxy
app.set('trust proxy', true)
app.use(express.json());
app.use(cookieSession({
  secure: process.env.NODE_ENV !== 'test',
  signed: false
}))

app.use(currentUser)
app.use(indexOrderRouter)
app.use(showOrderRouter)
app.use(deleteOrderRouter)
app.use(newOrderRouter)


app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }