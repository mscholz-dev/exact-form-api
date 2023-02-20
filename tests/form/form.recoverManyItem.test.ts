import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`PUT: ${route}/:key/recover`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).put(
      `${route}/key/recover`,
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .put(`${route}/key/recover`)
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
      .put(`${route}/key/recover`)
      .set("Cookie", [
        `user=${data.randomUserJwt}`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user not found",
    );
  });

  it("it should throw: ids required", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[0].key}/recover`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("ids required");
  });

  it("it should throw: id invalid", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[0].key}/recover`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ ids: ["invalid"] });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("id invalid");
  });

  it("it should throw: owner role required", async () => {
    const res = await request(app)
      .put(`${route}/${data.objectId}/recover`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ ids: [data.objectId] });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "owner role required",
    );
  });

  // TODO: cannot test because cannot add another user now, DO IT LATER

  it("it should throw: id not found", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[0].key}/recover`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ ids: [data.objectId] });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("id not found");
  });

  it("it should recover a form item", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[0].key}?page=1&trash=true`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[0].key}/recover`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        ids: [`${items.body.items[0].id}`],
      });

    expect(res.statusCode).toBe(200);
  });

  it("it should recover 3 form item", async () => {
    const key = await request(app)
      .get(`${route}?page=2&trash=false`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[0].key}?page=1&trash=true`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[0].key}/recover`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        ids: [
          `${items.body.items[0].id}`,
          `${items.body.items[1].id}`,

          `${items.body.items[2].id}`,
        ],
      });

    expect(res.statusCode).toBe(200);
  });
});
