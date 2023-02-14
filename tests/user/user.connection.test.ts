import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/user/connection";

describe(`POST: ${route}`, () => {
  it("it should throw: email required", async () => {
    const res = await request(app).post(route);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "email required",
    );
  });

  it("it should throw: email too long", async () => {
    const res = await request(app)
      .post(route)
      .send({ email: data.string256 });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "email too long",
    );
  });

  it("it should throw: email invalid", async () => {
    const res = await request(app)
      .post(route)
      .send({ email: "invalid email" });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "email invalid",
    );
  });

  it("it should throw: password required", async () => {
    const res = await request(app)
      .post(route)
      .send({ email: data.email });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password required",
    );
  });

  it("it should throw: password too long", async () => {
    const res = await request(app)
      .post(route)
      .send({
        email: data.email,
        password: data.string61,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password too long",
    );
  });

  it("it should throw: password must contain one upper case", async () => {
    const res = await request(app)
      .post(route)
      .send({
        email: data.email,
        password: "a",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password must contain one upper case",
    );
  });

  it("it should throw: password must contain one lower case", async () => {
    const res = await request(app)
      .post(route)
      .send({
        email: data.email,
        password: "A",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password must contain one lower case",
    );
  });

  it("it should throw: password must contain one digit", async () => {
    const res = await request(app)
      .post(route)
      .send({
        email: data.email,
        password: "Aa",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password must contain one digit",
    );
  });

  it("it should throw: password must contain one special character", async () => {
    const res = await request(app)
      .post(route)
      .send({
        email: data.email,
        password: "Aa1",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password must contain one special character",
    );
  });

  it("it should throw: password must contain 8 characters", async () => {
    const res = await request(app)
      .post(route)
      .send({
        email: data.email,
        password: "Aa1$",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password must contain 8 characters",
    );
  });

  it("it should throw: locale required", async () => {
    const res = await request(app)
      .post(route)
      .send({
        email: data.email,
        password: data.password,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "locale required",
    );
  });

  it("it should throw: locale invalid", async () => {
    const res = await request(app)
      .post(route)
      .send({
        email: data.email,
        password: data.password,
        locale: "invalid locale",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "locale invalid",
    );
  });

  it("it should throw: user not found", async () => {
    const res = await request(app)
      .post(route)
      .send({
        email: "user.not.found@gmail.com",
        password: data.password,
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "user not found",
    );
  });

  it("it should throw: password incorrect", async () => {
    const res = await request(app)
      .post(route)
      .send({
        email: data.email,
        password: `${data.password}$`,
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password incorrect",
    );
  });

  it("it should connect a fr user", async () => {
    const res = await request(app)
      .post(route)
      .send({
        email: data.email,
        password: data.password,
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);
  });
});
