import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/contact/contact";

describe(`POST: ${route}`, () => {
  it("it should throw: lastName required", async () => {
    const res = await request(app).post(route);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "lastName required",
    );
  });

  it("it should throw: lastName too long", async () => {
    const res = await request(app)
      .post(route)
      .send({ lastName: data.string61 });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "lastName too long",
    );
  });

  it("it should throw: firstName required", async () => {
    const res = await request(app)
      .post(route)
      .send({ lastName: data.lastName });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "firstName required",
    );
  });

  it("it should throw: firstName too long", async () => {
    const res = await request(app)
      .post(route)
      .send({
        lastName: data.lastName,
        firstName: data.string61,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "firstName too long",
    );
  });

  it("it should throw: email required", async () => {
    const res = await request(app)
      .post(route)
      .send({
        lastName: data.lastName,
        firstName: data.firstName,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "email required",
    );
  });

  it("it should throw: email too long", async () => {
    const res = await request(app)
      .post(route)
      .send({
        lastName: data.lastName,
        firstName: data.firstName,
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
        lastName: data.lastName,
        firstName: data.firstName,
        email: "invalid email",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "email invalid",
    );
  });

  it("it should throw: phone invalid", async () => {
    const res = await request(app)
      .post(route)
      .send({
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        phone: "phone invalid",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "phone invalid",
    );
  });

  it("it should throw: message required", async () => {
    const res = await request(app)
      .post(route)
      .send({
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        phone: "",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "message required",
    );
  });

  it("it should throw: message too long", async () => {
    const res = await request(app)
      .post(route)
      .send({
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        phone: "",
        message: data.string10_001,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "message too long",
    );
  });

  it("it should throw: locale required", async () => {
    const res = await request(app)
      .post(route)
      .send({
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        phone: "",
        message: data.message,
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
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        phone: "",
        message: data.message,
        locale: "invalid",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "locale invalid",
    );
  });

  it("it should send a french email without phone", async () => {
    const res = await request(app)
      .post(route)
      .send({
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        phone: "",
        message: data.message,
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(200);
  });

  it("it should send an english email with phone", async () => {
    const res = await request(app)
      .post(route)
      .send({
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        locale: data.localeEn,
      });
    expect(res.statusCode).toBe(200);
  });
});
