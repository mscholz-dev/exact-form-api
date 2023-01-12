import userModel from "../src/user/user.model.js";

// contact
import "./user/user.create.test.js";

// delete cache for every test
beforeEach(() => {
  jest.resetModules();
});

// reset test db
afterAll(async () => {
  await userModel.deleteMany();
});
