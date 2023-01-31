import request from "supertest";
import app from "../../app.js";

const route = "/api/test/new-db";

describe(`GET: ${route}`, () => {
  it("it should reset test DB", async () => {
    const res = await request(app).get(route);
    expect(res.statusCode).toBe(200);
  });
});
