// import connectDB from "../src/config/db.js";
// import UserServiceClass from "../src/user/user.service.js";
// const UserService = new UserServiceClass();

// contact
import "./user/user.create.test.js";

// connect to test db
beforeEach(async () => {
  // delete cache for every test
  jest.resetModules();
});

// reset test db
afterEach(async () => {
  // await UserService.deleteAll();
});
