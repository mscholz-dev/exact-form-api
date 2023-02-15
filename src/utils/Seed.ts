import { PrismaClient } from "@prisma/client";
import SecurityClass from "./Security.js";

// classes
const Prisma = new PrismaClient();
const Security = new SecurityClass();

export default class Seed {
  toString(element: any): string {
    if (typeof element === "object")
      return JSON.stringify(element);

    return element.toString();
  }

  async execute() {
    // hashed password
    const password = await Security.createHash(
      "Azerty5!",
    );

    // create user1
    const user1 = await Prisma.user.create({
      data: {
        username: "mscholz.dev",
        email: "mscholz.dev@gmail.com",
        password,
        role: "CLIENT",
        market: true,
      },
    });

    // create form1 with user1
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

    // create form item with form1User1
    const formItem1User1 =
      await Prisma.form_item.create({
        data: {
          form_id: form1User1.id,
          data: {
            data1: this.toString(
              "AZERTYUIOPQSDFGHJKLMWXCVBN",
            ),
            data2: this.toString(0),
            data3: this.toString({
              key1: 1,
              key2: "key2Value",
            }),
            data4: this.toString(false),
            data5: this.toString([
              "array1",
              "array2",
            ]),
            data6: this.toString(
              '<script>alert("ok")</script>',
            ),
          },
        },
      });

    // create 60 form items with form1User1
    for (let i = 2; i < 61; i++) {
      await Prisma.form_item.create({
        data: {
          form_id: form1User1.id,
          data: {
            data1: this.toString(
              Math.round(Math.random() * 100),
            ),
            data2: this.toString(
              Math.round(Math.random() * 100),
            ),
            data3: this.toString(
              Math.round(Math.random() * 100),
            ),
            data4: this.toString(
              Math.round(Math.random() * 100),
            ),
            data5: this.toString(
              Math.round(Math.random() * 100),
            ),
            data6: this.toString(
              Math.round(Math.random() * 100),
            ),
          },
        },
      });
    }
  }
}
