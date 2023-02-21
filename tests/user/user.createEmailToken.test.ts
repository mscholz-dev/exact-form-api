import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/user/email";

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

  it("it should throw: locale required", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "locale required",
    );
  });

  it("it should throw: locale invalid", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ locale: "invalid locale" });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "locale invalid",
    );
  });

  it("it should send a fr email with a valid token", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ locale: data.localeFr });
    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);
  });

  it("it should throw: token already exists", async () => {
    const res = await request(app)
      .post(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ locale: data.localeFr });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "token already exists",
    );
  });
});
