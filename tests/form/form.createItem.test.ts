import request from "supertest";
import app from "../../app.js";
import data from "../config/data.js";

const route = "/api/form";

describe(`POST: ${route}`, () => {
  it("it should throw: data required", async () => {
    const res = await request(app).post(
      `${route}/key-invalid`,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "data required",
    );
  });

  it("it should throw: key created_at is forbidden", async () => {
    const res = await request(app)
      .post(`${route}/key-invalid`)
      .send({ created_at: "test" });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "key created_at is forbidden",
    );
  });

  it("it should throw: key not found", async () => {
    const res = await request(app)
      .post(`${route}/key-invalid`)
      .send({ data0: 0 });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "key not found",
    );
  });

  // add form item to form0
  it("it should create 20 form items for form0", async () => {
    const key = await request(app)
      .get(`${route}?page=2`)
      .set("Cookie", [`user=${data.validFrJwt}`]);

    const send: Record<string, number> = {};

    for (let i = 0; i < 75; i++) {
      send[`data${i}`] = i;

      const res = await request(app)
        .post(`${route}/${key.body.forms[1].key}`)
        .send(send);
      expect(res.statusCode).toBe(200);
    }
  });
});
