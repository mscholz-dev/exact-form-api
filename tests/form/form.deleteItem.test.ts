import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`DELETE: ${route}`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).delete(
      `${route}/key/id`,
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .delete(`${route}/key/id`)
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
      .delete(`${route}/key/id`)
      .set("Cookie", [
        `user=${data.randomUserJwt}`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user not found",
    );
  });

  it("it should throw: owner role required", async () => {
    const res = await request(app)
      .delete(`${route}/key/id`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "owner role required",
    );
  });

  it("it should throw: owner role required", async () => {
    const res = await request(app)
      .delete(`${route}/key/id`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "owner role required",
    );
  });

  it("it should throw: id not found", async () => {
    const res = await request(app)
      .delete(`${route}/key/id`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("id not found");
  });

  it("it should delete a form item", async () => {
    const res = await request(app)
      .delete(`${route}/key/id`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(200);
  });
});
