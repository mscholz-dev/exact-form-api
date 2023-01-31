import request from "supertest";
import app from "../app.js";

const resetRoute = "/api/test/new-db";

// user
import "./user/user.create.test.js";
import "./user/user.connection.test.js";
import "./user/user.update.test.js";
import "./user/user.createEmailToken.test.js";

// auth
import "./auth/auth.index.test.js";
import "./auth/auth.hasEmailToken.test.js";

// user
import "./user/user.updateEmail.test.js";

// contact
import "./contact/contact.create.test.js";

beforeAll(async () => {
  // reset test db
  await request(app).get(resetRoute);
});

beforeEach(async () => {
  // delete cache for every test
  jest.resetModules();
});
