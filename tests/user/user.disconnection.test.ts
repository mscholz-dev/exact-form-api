import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/user/disconnection";

describe(`GET: ${route}`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).get(route);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .get(route)
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
      .get(route)
      .set("Cookie", [
        `user=${data.randomUserJwt}`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user not found",
    );
  });

  it("it should disconnect current user", async () => {
    const res = await request(app)
      .get(route)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(200);
  });
});
