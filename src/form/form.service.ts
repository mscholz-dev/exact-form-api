import { PrismaClient } from "@prisma/client";
import AppError from "src/utils/AppError.js";
import SecurityClass from "../utils/Security.js";

// types
import {
  TFormCreateData,
  TFormGetAllData,
} from "../utils/types.js";

// classes
const Prisma = new PrismaClient();
const Security = new SecurityClass();

export default class FormService {
  async create(
    { name, timezone }: TFormCreateData,
    id: string,
  ): Promise<void> {
    await Prisma.form.create({
      data: {
        name,
        timezone,
        key: Security.createUUID(),
        form_user: {
          create: {
            // form_id is added automatically
            user_id: id,
            role: "OWNER",
          },
        },
      },
      select: { id: true },
    });

    return;
  }

  async getAll(id: string) {
    const forms = await Prisma.form_user.findMany(
      {
        where: {
          user_id: id,
        },
        select: {
          form: {
            select: {
              name: true,
              key: true,
              timezone: true,
              _count: {
                select: {
                  form_item: true,
                },
              },
              form_user: {
                where: {
                  role: "OWNER",
                },
                select: {
                  user: {
                    select: {
                      username: true,
                    },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      },
    );

    // refacto object structure
    return forms.map((item) => ({
      name: item.form.name,
      key: item.form.key,
      timezone: item.form.timezone,
      items: item.form._count.form_item,
      owner: item.form.form_user[0].user.username,
    }));
  }
}
