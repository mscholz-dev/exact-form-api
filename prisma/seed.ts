import { PrismaClient } from "@prisma/client";
import SecurityClass from "../src/utils/Security.js";

// classes
const Prisma = new PrismaClient();
const Security = new SecurityClass();

const seed = async () => {
  // hashed password
  const password = await Security.createHash("a");

  // create mscholz.dev user
  const user1 = await Prisma.user.create({
    data: {
      username: "mscholz.dev",
      email: "mscholz.dev@gmail.com",
      password,
      role: "CLIENT",
      market: true,
    },
  });

  // create form with user1
  const form1User1 = await Prisma.form.create({
    data: {
      name: "Form 1 User 1",
      timezone: "Europe/Paris",
      key: Security.createUUID(),
      form_user: {
        create: {
          // form_id is added automatically
          user_id: user1.id,
          role: "OWNER",
        },
      },
    },
  });

  // create 19 forms with user1
  for (let i = 2; i < 20; i++) {
    await Prisma.form.create({
      data: {
        name: `Form ${i} User 1`,
        timezone: "Europe/Paris",
        key: Security.createUUID(),
        form_user: {
          create: {
            // form_id is added automatically
            user_id: user1.id,
            role: "OWNER",
          },
        },
      },
    });
  }
};

export default seed;
