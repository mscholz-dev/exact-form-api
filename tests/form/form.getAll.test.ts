import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

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

  it("it should throw: page required", async () => {
    const res = await request(app)
      .get(route)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "page required",
    );
  });

  it("it should throw: page must be greater than 0", async () => {
    const res = await request(app)
      .get(`${route}?page=-1`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "page must be greater than 0",
    );
  });

  it("it should throw: page must be a number", async () => {
    const res = await request(app)
      .get(`${route}?page=invalid`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "page must be a number",
    );
  });

  it("it should throw: trash required", async () => {
    const res = await request(app)
      .get(`${route}?page=1`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "trash required",
    );
  });

  it("it should throw: trash invalid", async () => {
    const res = await request(app)
      .get(`${route}?page=1&trash=invalid`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "trash invalid",
    );
  });

  it("it should return 8 last forms of an user (page 1)", async () => {
    const res = await request(app)
      .get(`${route}?page=1&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);
    expect(res.body.forms.length).toBe(8);
    expect(res.body.countAll).toBe(10);
    expect(res.body.username).toBe(data.username);
    expect(res.body.email).toBe(data.email);
    expect(res.body.role).toBe(data.client);
  });

  it("it should return 2 last forms of an user (page 2)", async () => {
    const res = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);
    expect(res.body.forms.length).toBe(2);
    expect(res.body.countAll).toBe(10);
    expect(res.body.username).toBe(data.username);
    expect(res.body.email).toBe(data.email);
    expect(res.body.role).toBe(data.client);
  });

  it("it should return 0 forms of an user (page 3)", async () => {
    const res = await request(app)
      .get(`${route}?page=3&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);
    expect(res.body.forms.length).toBe(0);
    expect(res.body.countAll).toBe(10);
    expect(res.body.username).toBe(data.username);
    expect(res.body.email).toBe(data.email);
    expect(res.body.role).toBe(data.client);
  });
});
