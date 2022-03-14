import { Stan, connect } from "node-nats-streaming";

// this class allows us to create and share a nats client instance to any file.

class NatsWrapper {
  private _client?: Stan;

  // we will use this getter method in other files whenever we want access to the client
  get client() {
    if (!this._client) {
      throw new Error("NATS client still connecting...");
    }
    return this._client;
  }

  // method that creates the connection
  connect(clusterId: string, clientId: string, url: string) {
    this._client = connect(clusterId, clientId, { url });
    
    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("connected to NATS");
        resolve();
      });
      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

// initialise the instance
export const natsWrapper = new NatsWrapper();
