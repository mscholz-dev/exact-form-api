import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`PUT: ${route}`, () => {
  it("it should throw: user cookie not found", async () => {
    const res = await request(app).put(
      `${route}/key/id`,
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user cookie not found",
    );
  });

  it("it should throw: user cookie invalid", async () => {
    const res = await request(app)
      .put(`${route}/key/id`)
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
      .put(`${route}/key/id`)
      .set("Cookie", [
        `user=${data.randomUserJwt}`,
      ]);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe(
      "user not found",
    );
  });

  it("it should throw: data too long", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(`${route}/${key.body.forms[1].key}/id`)
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ tooLong: data.string1_001 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "data too long",
    );
  });

  it("it should throw: id invalid", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(`${route}/${key.body.forms[1].key}/id`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("id invalid");
  });

  it("it should throw: data required", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${data.objectId}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "data required",
    );
  });

  it("it should throw: key created_at is forbidden", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${data.objectId}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ created_at: "forbidden key" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "key created_at is forbidden",
    );
  });

  it("it should throw: owner role required", async () => {
    const res = await request(app)
      .put(
        `${route}/${data.objectId}/${data.objectId}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ test: "test" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "owner role required",
    );
  });

  it("it should throw: id not found", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${data.objectId}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({ test: "test" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("id not found");
  });

  it("it should throw: data not equal", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=1`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${items.body.items[0].id}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        test: "test",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "data not equal",
    );
  });

  it("it should throw: data not equal", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=1`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${items.body.items[0].id}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        data0: "udpdate 0",
        data1: "udpdate 1",
        data2: "udpdate 2",
        data3: "udpdate 3",
        data4: "udpdate 4",
        data5: "udpdate 5",
        data6: "udpdate 6",
        data7: "udpdate 7",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "data not equal",
    );
  });

  it("it should update a form item values", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=1`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${items.body.items[0].id}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        data0: "udpdate 0",
        data1: "udpdate 1",
        data2: "udpdate 2",
        data3: "udpdate 3",
        data4: "udpdate 4",
        data5: "udpdate 5",
        data6: "udpdate 6",
      });

    expect(res.statusCode).toBe(200);
  });

  it("it should throw: data must be different", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const items = await request(app)
      .get(
        `${route}/${key.body.forms[1].key}?page=1`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const res = await request(app)
      .put(
        `${route}/${key.body.forms[1].key}/${items.body.items[0].id}`,
      )
      .set("Cookie", [`user=${data.validFrJwt}`])
      .send({
        data0: "udpdate 0",
        data1: "udpdate 1",
        data2: "udpdate 2",
        data3: "udpdate 3",
        data4: "udpdate 4",
        data5: "udpdate 5",
        data6: "udpdate 6",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "data must be different",
    );
  });
});
