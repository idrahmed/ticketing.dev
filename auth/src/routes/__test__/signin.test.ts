import request from "supertest";
import { app } from "../../app";

it("fails when user logs in with an email that does not exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async() => {
    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

    await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "wrongpassword",
    })
    .expect(400);
})

it('server sends cookie upon successful login', async() => {
    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

    const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined()
})