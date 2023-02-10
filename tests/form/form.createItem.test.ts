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

  it("it should throw: key not found", async () => {
    const res = await request(app)
      .post(`${route}/key-invalid`)
      .send(data.formItem1);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "key not found",
    );
  });

  // TODO: wait get method
  // it("it should create a form item", async () => {
  //   const key = "test";

  //   const res = await request(app)
  //     .post(`${route}/${key}`)
  //     .send(data.formItem1);
  //   expect(res.statusCode).toBe(200);
  // });
});
