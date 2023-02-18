import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`PUT: ${route}`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).put(
      `${route}/key`,
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .put(`${route}/key`)
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
      .put(`${route}/key`)
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
      .put(`${route}/${data.objectId}`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "formName required",
    );
  });

  it("it should throw: formName too long", async () => {
    const res = await request(app)
      .put(`${route}/${data.objectId}`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ name: data.string61 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "formName too long",
    );
  });

  it("it should throw: timezone required", async () => {
    const res = await request(app)
      .put(`${route}/${data.objectId}`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ name: data.formName });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "timezone required",
    );
  });

  it("it should throw: timezone invalid", async () => {
    const res = await request(app)
      .put(`${route}/${data.objectId}`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        name: data.formName,
        timezone: "invalid",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "timezone invalid",
    );
  });

  it("it should throw: owner role required", async () => {
    const res = await request(app)
      .put(`${route}/${data.objectId}`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        name: data.formName,
        timezone: data.formTimezone,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "owner role required",
    );
  });

  // TODO: need test with adding user to the form group, DO IT LATER

  it("it should update name and timezone of a form", async () => {
    const key = await request(app)
      .get(`${route}?page=1`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(`${route}/${key.body.forms[0].key}`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        name: `NEW ${data.formName}`,
        timezone: "Africa/Abidjan",
      });

    expect(res.statusCode).toBe(200);
  });

  it("it should throw: name or timezone must be different", async () => {
    const key = await request(app)
      .get(`${route}?page=1`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(`${route}/${key.body.forms[0].key}`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        name: `NEW ${data.formName}`,
        timezone: "Africa/Abidjan",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "name or timezone must be different",
    );
  });

  it("it should update name of a form", async () => {
    const key = await request(app)
      .get(`${route}?page=1`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(`${route}/${key.body.forms[0].key}`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        name: data.formName,
        timezone: "Africa/Abidjan",
      });

    expect(res.statusCode).toBe(200);
  });

  it("it should update timezone of a form", async () => {
    const key = await request(app)
      .get(`${route}?page=1`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(`${route}/${key.body.forms[0].key}`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        name: data.formName,
        timezone: data.formTimezone,
      });

    expect(res.statusCode).toBe(200);
  });
});
