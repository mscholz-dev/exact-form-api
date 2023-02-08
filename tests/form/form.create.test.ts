import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`POST: ${route}`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).post(route);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [
        `user=${data.validFrJwt}!`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie invalid",
    );
  });

  it("it should throw: user not found", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [
        `user=${data.randomUserJwt}`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user not found",
    );
  });

  it("it should throw: formName required", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "formName required",
    );
  });

  it("it should throw: formName too long", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ name: data.string61 });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "formName too long",
    );
  });

  it("it should throw: timezone required", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ name: data.formName });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "timezone required",
    );
  });

  it("it should throw: timezone invalid", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        name: data.formName,
        timezone: "timezone invalid",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "timezone invalid",
    );
  });

  it("it should throw: locale required", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        name: data.formName,
        timezone: data.formTimezone,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "locale required",
    );
  });

  it("it should throw: locale invalid", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        name: data.formName,
        timezone: data.formTimezone,
        locale: "locale invalid",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "locale invalid",
    );
  });

  it("it should create a fr form", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        name: data.formName,
        timezone: data.formTimezone,
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(200);
  });
});
