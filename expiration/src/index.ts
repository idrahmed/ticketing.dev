import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("MONGO_URL must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("MONGO_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("MONGO_URL must be defined");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    // close the connection on close
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    // first close our connection when we hit ctrl C
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.log(err);
  }
};

start();
