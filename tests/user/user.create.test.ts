import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/user";

describe(`POST: ${route}`, () => {
  it("it should throw: username required", async () => {
    const res = await request(app).post(route);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "username required",
    );
  });

  it("it should throw: username too long", async () => {
    const res = await request(app)
      .post(route)
      .send({ username: data.string61 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "username too long",
    );
  });

  it("it should throw: email required", async () => {
    const res = await request(app)
      .post(route)
      .send({ username: data.username });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "email required",
    );
  });

  it("it should throw: email too long", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.string256,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "email too long",
    );
  });

  it("it should throw: email invalid", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: "invalid email",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "email invalid",
    );
  });

  it("it should throw: password required", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password required",
    );
  });

  it("it should throw: password too long", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
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
        username: data.username,
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
        username: data.username,
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
        username: data.username,
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
        username: data.username,
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
        username: data.username,
        email: data.email,
        password: "Aa1$",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password must contain 8 characters",
    );
  });

  it("it should throw: password2 required", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password2 required",
    );
  });

  it("it should throw: password2 too long", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.string61,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password2 too long",
    );
  });

  it("it should throw: password2 must contain one upper case", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: "a",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password2 must contain one upper case",
    );
  });

  it("it should throw: password2 must contain one lower case", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: "A",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password2 must contain one lower case",
    );
  });

  it("it should throw: password2 must contain one digit", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: "Aa",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password2 must contain one digit",
    );
  });

  it("it should throw: password2 must contain one special character", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: "Aa1",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password2 must contain one special character",
    );
  });

  it("it should throw: password2 must contain 8 characters", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: "Aa1$",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "password2 must contain 8 characters",
    );
  });

  it("it should throw: locale required", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.password,
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
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.password,
        locale: "invalid locale",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "locale invalid",
    );
  });

  it("it should throw: passwords not matching", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: `${data.password}$`,
        locale: data.localeFr,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "passwords not matching",
    );
  });

  it("it should throw: market required", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.password,
        locale: data.localeFr,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "market required",
    );
  });

  it("it should throw: market invalid", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.password,
        market: "market",
        locale: data.localeFr,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "market invalid",
    );
  });

  it("it should create a fr user", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.password,
        market: "true",
        locale: data.localeFr,
      });

    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);
  });

  it("it should create an en user", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: `en.${data.username}`,
        email: `en.${data.email}`,
        password: data.password,
        password2: data.password,
        market: "true",
        locale: data.localeEn,
      });

    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validEnJwt);
  });

  it("it should throw: username already exists", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.password,
        market: "true",
        locale: data.localeFr,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "username already exists",
    );
  });

  it("it should throw: email already exists", async () => {
    const res = await request(app)
      .post(route)
      .send({
        username: `${data.username}2`,
        email: data.email,
        password: data.password,
        password2: data.password,
        market: "true",
        locale: data.localeFr,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "email already exists",
    );
  });
});
