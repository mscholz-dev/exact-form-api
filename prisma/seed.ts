import { PrismaClient } from "@prisma/client";
import SecurityClass from "../src/utils/Security.js";
import TestServiceClass from "../src/test/test.service.js";

// classes
const Prisma = new PrismaClient();
const Security = new SecurityClass();
const TestService = new TestServiceClass();

async function main() {
  // reset DB
  await TestService.newDB();

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

  // create scholzmorgan16 user
  const user2 = await Prisma.user.create({
    data: {
      username: "scholzmorgan16",
      email: "scholzmorgan16@yahoo.fr",
      password,
      role: "CLIENT",
      market: false,
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

  // create form with user2
  const form2User2 = await Prisma.form.create({
    data: {
      name: "Form 2 User 2",
      timezone: "Europe/Paris",
      key: Security.createUUID(),
      form_user: {
        create: {
          // form_id is added automatically
          user_id: user2.id,
          role: "OWNER",
        },
      },
    },
  });

  // add user1 to form2
  const form2User1 =
    await Prisma.form_user.create({
      data: {
        form_id: form2User2.id,
        user_id: user1.id,
      },
    });

  // add user2 to form1
  const form1User2 =
    await Prisma.form_user.create({
      data: {
        form_id: form1User1.id,
        user_id: user2.id,
      },
    });

  console.log(
    user1,
    user2,
    form1User1,
    form2User2,
    form2User1,
    form1User2,
  );
}

main()
  .then(async () => {
    await Prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await Prisma.$disconnect();

    process.exit(1);
  });
