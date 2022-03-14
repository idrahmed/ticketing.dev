import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signin: (id?: string) => string[];
}

// before our test suit runs we are going to create a new instance of mongoMemoryServer.
// running mongodb in memory will allow us to run multiple tests suites at the same time
// across different projects without them all trying to reach out to the same copy of mongo.

jest.mock("../nats-wrapper");

let mongo: any;

process.env.STRIPE_KEY =
  "sk_test_51I8wqdDMbiFkoU4g8Qpgwy3Iu7VDnGBtDYiPRBPGlkeXp2EO8pUxSezd9nFOuZVAdUEXaP5d6NgowI72ynbOaLTW00pL17dnHM";

beforeAll(async () => {
  // setting env vars
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

// before each test we are going to reset our mongo db.

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// after our tests we are going to stop the mongo server and tell mongoose to dc from it too.

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

// function in the global scope that signs up a user
// since the fn is in the global space we wont need to import it.

global.signin = (id?: string) => {
  // build a jwt payload {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  // create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build session object. {jwt: MY_JWT}
  const session = { jwt: token };
  // turn that session into json
  const sessionJSON = JSON.stringify(session);
  // tank json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
