import request from "supertest";
import app from "../app.js";

const resetRoute = "/api/test/reset";

// user
import "./user/user.create.test.js";
import "./user/user.connect.test.js";

// contact
import "./contact/contact.contact.test.js";

beforeAll(async () => {
  // reset test db
  await request(app).post(resetRoute);
});

beforeEach(async () => {
  // delete cache for every test
  jest.resetModules();
});

afterAll(async () => {
  // reset test db
  await request(app).post(resetRoute);
});
