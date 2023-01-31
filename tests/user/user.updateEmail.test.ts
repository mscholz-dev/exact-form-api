import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/user/email";

describe(`PUT: ${route}`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).put(route);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .put(route)
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
      .put(route)
      .set("Cookie", [
        `user=${data.randomUserJwt}`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user not found",
    );
  });

  it("it should throw: newEmail required", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newEmail required",
    );
  });

  it("it should throw: newEmail too long", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ newEmail: data.string256 });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newEmail too long",
    );
  });

  it("it should throw: newEmail invalid", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ newEmail: "email invalid" });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newEmail invalid",
    );
  });

  it("it should throw: newEmail2 required", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ newEmail: data.email2 });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newEmail2 required",
    );
  });

  it("it should throw: newEmail2 too long", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        newEmail: data.email2,
        newEmail2: data.string256,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newEmail2 too long",
    );
  });

  it("it should throw: newEmail2 invalid", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        newEmail: data.email2,
        newEmail2: "email invalid",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newEmail2 invalid",
    );
  });

  it("it should throw: token required", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        newEmail: data.email2,
        newEmail2: data.email2,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "token required",
    );
  });

  it("it should throw: locale required", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        newEmail: data.email2,
        newEmail2: data.email2,
        token: "token",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "locale required",
    );
  });

  it("it should throw: locale invalid", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        newEmail: data.email2,
        newEmail2: data.email2,
        token: "token",
        locale: "invalid locale",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "locale invalid",
    );
  });

  it("it should throw: newEmails not matching", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        newEmail: data.email2,
        newEmail2: data.email,
        token: "token",
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newEmails not matching",
    );
  });

  it("it should throw: newEmail must be different", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        newEmail: data.email,
        newEmail2: data.email,
        token: "token",
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newEmail must be different",
    );
  });

  it("it should throw: token not found", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        newEmail: data.email2,
        newEmail2: data.email2,
        token: "invalid-token",
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "token not found",
    );
  });

  it("it should update email and verify if token not usable", async () => {
    const {
      body: { token },
    } = await request(app)
      .get("/api/test/user/token/email")
      .set("Cookie", [`user=${data.validFrJwt}`]);

    // update email
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        newEmail: data.email2,
        newEmail2: data.email2,
        token: token,
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrUpdateEmailJwt);

    // verify token not usable
    const res2 = await request(app)
      .put(route)
      .set("Cookie", [
        `user=${data.validFrUpdateEmailJwt}`,
      ])
      .send({
        newEmail: data.email,
        newEmail2: data.email,
        token: token,
        locale: data.localeFr,
      });
    expect(res2.statusCode).toBe(400);
    expect(res2.body.message).toBe(
      "token not found",
    );
  });
});
