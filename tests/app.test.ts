import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// user
import "./user/user.create.test.js";
import "./user/user.connect.test.js";

// contact
import "./contact/contact.contact.test.js";

beforeEach(async () => {
  // delete cache for every test
  jest.resetModules();
});

afterAll(async () => {
  // reset test db
  await prisma.user.deleteMany();
});
