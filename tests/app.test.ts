import request from "supertest";
import app from "../app.js";

const resetRoute = "/api/test/new-db";

// user
import "./user/user.create.test.js";
import "./user/user.connect.test.js";
import "./user/user.update.test.js";

// contact
import "./contact/contact.contact.test.js";

beforeAll(async () => {
  // reset test db
  await request(app).get(resetRoute);
});

beforeEach(async () => {
  // delete cache for every test
  jest.resetModules();
});
