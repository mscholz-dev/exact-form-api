// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// contact
// import "./contact/email.test";

// auth
// import "./auth/signup.test";
// import "./auth/signin.test";

// delete cache for every test
beforeEach(() => {
  jest.resetModules();
});

// reset test db
afterAll(async () => {
  // await prisma.user.deleteMany();
});
