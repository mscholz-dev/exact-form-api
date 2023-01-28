import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/user";

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
      .set("Cookie", [`user=${data.validJwt}!`]);
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

  it("it should throw: username required", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "username required",
    );
  });

  it("it should throw: username too long", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`])
      .send({ username: data.string61 });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "username too long",
    );
  });

  it("it should throw: oldPassword too long", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.string61,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "oldPassword too long",
    );
  });

  it("it should throw: newPassword required", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword required",
    );
  });

  it("it should throw: newPassword too long", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: data.string61,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword too long",
    );
  });

  it("it should throw: newPassword2 required", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword2 required",
    );
  });

  it("it should throw: newPassword2 too long", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: data.string61,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword2 too long",
    );
  });

  it("it should throw: newPasswords not matching", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: `${data.password}.not.matching`,
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPasswords not matching",
    );
  });

  it("it should throw: username already exists", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`])
      .send({
        username: `en.${data.username}`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: `${data.password}.new`,
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "username already exists",
    );
  });

  it("it should throw: oldPassword incorrect", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: "password incorrect",
        newPassword: `${data.password}.new`,
        newPassword2: `${data.password}.new`,
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "oldPassword incorrect",
    );
  });

  it("it should update a fr user with new username and new password", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`])
      .send({
        username: `fr.${data.username}`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: `${data.password}.new`,
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(200);
  });

  it("it should update a fr user with new username", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validJwt}`])
      .send({
        username: `fr2.${data.username}`,
        newPassword: `${data.password}.new`,
        newPassword2: `${data.password}.new`,
        locale: data.localeFr,
      });
    // console.log(res.headers["set-cookie"]);
    expect(res.statusCode).toBe(200);
  });
});
