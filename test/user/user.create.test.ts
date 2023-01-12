import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/user";

describe(route, () => {
  it("it should throw: username required", async () => {
    const res = await request(app).post(route);
    expect(res.statusCode).toBe(400);
    expect(res.body.errorCode).toBe(400);
    expect(res.body.message).toBe(
      "username required",
    );
  });

  it("it should throw: username too long", async () => {
    const res = await request(app)
      .post(route)
      .send({ username: data.string61 });

    expect(res.statusCode).toBe(400);
    expect(res.body.errorCode).toBe(400);
    expect(res.body.message).toBe(
      "username too long",
    );
  });
});
