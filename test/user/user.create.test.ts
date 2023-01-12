import request from "supertest";
import app from "../../app.js";
import "../envTest.js";

const route = "/api/user";

describe(route, () => {
  it("should throw username required", async () => {
    const res = await request(app).post(route);

    expect(res.statusCode).toBe(400);
  });
});
