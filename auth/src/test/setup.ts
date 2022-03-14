import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

declare global {
  var signin: () => Promise<string[]>;
}

// before our test suit runs we are going to create a new instance of mongoMemoryServer.
// running mongodb in memory will allow us to run multiple tests suites at the same time
// across different projects without them all trying to reach out to the same copy of mongo.

let mongo: any;

beforeAll(async () => {
  // setting env vars
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

// before each test we are going to reset our mongo db.

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// after our tests we are going to stop the mongo server and tell mongoose to dc from it too.

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// function in the global scope that signs up a user
// since the fn is in the global space we wont need to import it. 

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie
};
