import connectDB from "../src/config/db.js";
// import userModel from "../src/user/user.model.js";

// contact
import "./user/user.create.test.js";

// connect to test db
beforeAll(async () => {
  const db = await connectDB();
  console.log(`MongoDB connected to: ${db}`);
});

// delete cache for every test
beforeEach(() => {
  jest.resetModules();
});

// reset test db
afterAll(async () => {
  // await userModel.findOne({
  //   email: "mscholz.dev@gmail.com",
  // });
});
