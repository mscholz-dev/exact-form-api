import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`GET: ${route}`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).get(
      `${route}/invalid`,
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .get(`${route}/invalid`)
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
      .get(`${route}/invalid`)
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
      .get(`${route}/invalid`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "page required",
    );
  });

  it("it should throw: page must be greater than 0", async () => {
    const res = await request(app)
      .get(`${route}/invalid?page=-1`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "page must be greater than 0",
    );
  });

  it("it should throw: page must be a number", async () => {
    const res = await request(app)
      .get(`${route}/invalid?page=invalid`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "page must be a number",
    );
  });

  it("it should throw: key not found", async () => {
    const res = await request(app)
      .get(`${route}/invalid?page=1`)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "key not found",
    );
  });

  it("it should return 50 form items (page 1)", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=1`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(
      "Wobinit Contact Form0",
    );
    expect(res.body.items.length).toBe(50);
    expect(res.body.countAll).toBe(75);
    expect(res.body.username).toBe(data.username);
    expect(res.body.email).toBe(data.email);
    expect(res.body.role).toBe(data.client);
  });

  it("it should return 25 form items (page 2)", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=2`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(
      "Wobinit Contact Form0",
    );
    expect(res.body.items.length).toBe(25);
    expect(res.body.countAll).toBe(75);
    expect(res.body.username).toBe(data.username);
    expect(res.body.email).toBe(data.email);
    expect(res.body.role).toBe(data.client);
  });

  it("it should return 0 form items (page 3)", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=3`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(
      "Wobinit Contact Form0",
    );
    expect(res.body.timezone).toBe(
      data.formTimezone,
    );
    expect(res.body.items.length).toBe(0);
    expect(res.body.countAll).toBe(75);
    expect(res.body.username).toBe(data.username);
    expect(res.body.email).toBe(data.email);
    expect(res.body.role).toBe(data.client);
  });
});
