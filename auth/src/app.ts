import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@iatickets-dev/common";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
// trusting the ingress nginx proxy
app.set('trust proxy', true)
app.use(express.json());
app.use(cookieSession({
  secure: process.env.NODE_ENV !== 'test',
  signed: false
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }