import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// user
import "./user/user.create.test.js";
import "./user/user.connect.test.js";

// contact
import "./contact/contact.contact.test.js";

// connect to test db
beforeEach(async () => {
  // delete cache for every test
  jest.resetModules();
});

// reset test db
afterAll(async () => {
  await prisma.user.deleteMany();
});
