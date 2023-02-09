import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`POST: ${route}`, () => {
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

  it("it should return all forms of an user", async () => {
    const res = await request(app)
      .get(route)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(200);
    //  expect(res.body.)
  });
});
