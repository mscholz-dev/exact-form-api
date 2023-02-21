import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`PUT: ${route}/recover`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).put(
      `${route}/recover`,
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .put(`${route}/recover`)
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
      .put(`${route}/recover`)
      .set("Cookie", [
        `user=${data.randomUserJwt}`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user not found",
    );
  });

  it("it should throw: key required", async () => {
    const res = await request(app)
      .put(`${route}/recover`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("key required");
  });

  it("it should throw: owner role required", async () => {
    const res = await request(app)
      .put(`${route}/recover`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ key: data.objectId });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "owner role required",
    );
  });

  // TODO: cannot test because cannot add another user now, DO IT LATER

  it("it should throw: key not found", async () => {
    const key = await request(app)
      .get(`${route}?page=1&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(`${route}/recover`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ key: key.body.forms[0].key });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "key not found",
    );
  });

  it("it should recover a form", async () => {
    const key = await request(app)
      .get(`${route}?page=1&trash=true`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(`${route}/recover`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ key: key.body.forms[0].key });
    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);
  });
});
