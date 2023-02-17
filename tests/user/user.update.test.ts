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

  it("it should throw: username required", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`]);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "username required",
    );
  });

  it("it should throw: username too long", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ username: data.string61 });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "username too long",
    );
  });

  it("it should throw: oldPassword too long", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.string61,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "oldPassword too long",
    );
  });

  it("it should throw: oldPassword must contain one upper case", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: "a",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "oldPassword must contain one upper case",
    );
  });

  it("it should throw: oldPassword must contain one lower case", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: "A",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "oldPassword must contain one lower case",
    );
  });

  it("it should throw: oldPassword must contain one digit", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: "Aa",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "oldPassword must contain one digit",
    );
  });

  it("it should throw: oldPassword must contain one special character", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: "Aa1",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "oldPassword must contain one special character",
    );
  });

  it("it should throw: oldPassword must contain 8 characters", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: "Aa1$",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "oldPassword must contain 8 characters",
    );
  });

  it("it should throw: newPassword required", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
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
      .set("Cookie", [`user=${data.validFrJwt}`])
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

  it("it should throw: newPassword must contain one upper case", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: "a",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword must contain one upper case",
    );
  });

  it("it should throw: newPassword must contain one lower case", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: "A",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword must contain one lower case",
    );
  });

  it("it should throw: newPassword must contain one digit", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: "Aa",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword must contain one digit",
    );
  });

  it("it should throw: newPassword must contain one special character", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: "Aa1",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword must contain one special character",
    );
  });

  it("it should throw: newPassword must contain 8 characters", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: "Aa1$",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword must contain 8 characters",
    );
  });

  it("it should throw: newPassword2 required", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
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
      .set("Cookie", [`user=${data.validFrJwt}`])
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

  it("it should throw: newPassword2 must contain one upper case", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: "a",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword2 must contain one upper case",
    );
  });

  it("it should throw: newPassword2 must contain one lower case", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: "A",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword2 must contain one lower case",
    );
  });

  it("it should throw: newPassword2 must contain one digit", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: "Aa",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword2 must contain one digit",
    );
  });

  it("it should throw: newPassword2 must contain one special character", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: "Aa1",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword2 must contain one special character",
    );
  });

  it("it should throw: newPassword2 must contain 8 characters", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: "Aa1$",
        market: "false",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "newPassword2 must contain 8 characters",
    );
  });

  it("it should throw: newPasswords not matching", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
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

  it("it should throw: market required", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: `${data.password}.new`,
        locale: data.localeFr,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "market required",
    );
  });

  it("it should throw: market invalid", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: `${data.password}.new`,
        locale: data.localeFr,
        market: "market",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "market invalid",
    );
  });

  it("it should throw: username already exists", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `en.${data.username}`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: `${data.password}.new`,
        market: "false",
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
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `${data.username}.new`,
        oldPassword: `${data.password}$`,
        newPassword: `${data.password}.new`,
        newPassword2: `${data.password}.new`,
        market: "false",
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
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `fr.${data.username}`,
        oldPassword: data.password,
        newPassword: `${data.password}.new`,
        newPassword2: `${data.password}.new`,
        market: "false",
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrUpdateOneJwt);
  });

  it("it should update a fr user with new username", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: `fr2.${data.username}`,
        newPassword: `${data.password}.new`,
        newPassword2: `${data.password}.new`,
        market: "false",
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrUpdateTwoJwt);
  });

  it("it should update a fr user with default username and default password", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: data.username,
        oldPassword: `${data.password}.new`,
        newPassword: data.password,
        newPassword2: data.password,
        market: "false",
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);
  });

  it("it should throw: username or market must be different", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: data.username,
        market: "false",
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "username or market must be different",
    );
  });

  it("it should update market", async () => {
    const res = await request(app)
      .put(route)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        username: data.username,
        market: "true",
        locale: data.localeFr,
      });
    expect(res.statusCode).toBe(200);
    expect(
      res.headers["set-cookie"][0],
    ).toContain(data.validFrJwt);
  });
});
