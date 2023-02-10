import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.js";
import SecurityClass from "../utils/Security.js";

// types
import {
  TFormCreateData,
  TFormCreateItemData,
  TFormGetSpecificFormReturn,
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

  async getAll(id: string, currentPage: number) {
    const data = await Prisma.$transaction([
      Prisma.form_user.count({
        where: {
          user_id: id,
        },
      }),
      Prisma.form_user.findMany({
        take: 8,
        skip: (currentPage - 1) * 8,
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
      }),
    ]);

    // refacto object structure
    const forms = data[1].map((item) => ({
      name: item.form.name,
      key: item.form.key,
      timezone: item.form.timezone,
      items: item.form._count.form_item,
      owner: item.form.form_user[0].user.username,
    }));

    return {
      countAll: data[0],
      forms,
    };
  }

  async createItem(
    schema: TFormCreateItemData,
  ): Promise<void> {
    const formId = await Prisma.form.findFirst({
      where: {
        key: schema.key,
      },
      select: {
        id: true,
      },
    });

    if (!formId?.id)
      throw new AppError("key not found", 400);

    await Prisma.form_item.create({
      data: {
        form_id: formId.id,
        data: schema.data,
      },
      select: {
        id: true,
      },
    });

    return;
  }

  async getSpecificForm(
    key: string,
    currentPage: number,
  ): Promise<TFormGetSpecificFormReturn> {
    const formId = await Prisma.form.findFirst({
      where: {
        key,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!formId?.id)
      throw new AppError("key not found", 400);

    const data = await Prisma.$transaction([
      Prisma.form_item.count({
        where: {
          form_id: formId.id,
        },
      }),
      Prisma.form_item.findMany({
        take: 8,
        skip: (currentPage - 1) * 8,
        where: {
          form_id: formId.id,
        },
        select: {
          created_at: true,
          data: true,
        },
      }),
    ]);

    // refacto object structure
    const items = data[1].map((item) => ({
      created_at: item.created_at,
      data: item.data,
    }));

    return {
      countAll: data[0],
      items,
      name: formId.name,
    };
  }
}
