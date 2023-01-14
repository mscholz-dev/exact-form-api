import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// contact
import "./user/user.create.test.js";

// connect to test db
beforeEach(async () => {
  // delete cache for every test
  jest.resetModules();
});

// reset test db
afterAll(async () => {
  await prisma.user.deleteMany();
});
