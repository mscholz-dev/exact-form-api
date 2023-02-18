import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import AppError from "../utils/AppError.js";
import SecurityClass from "../utils/Security.js";

// types
import {
  TFormCreateData,
  TFormCreateItemData,
  TFormDeleteItemData,
  TFormDeleteManyItemData,
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
    req: Request,
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

    // manage user_agent
    const getUserAgent =
      Security.getUserAgent(req);
    const createUserAgent =
      getUserAgent !== ""
        ? {
            create: {
              user_agent: getUserAgent,
            },
          }
        : {};

    // manage referer_url
    const getRefererUrl =
      Security.getRefererUrl(req);
    const createRefererUrl =
      getRefererUrl !== ""
        ? {
            create: {
              referer_url: getRefererUrl,
            },
          }
        : {};

    // manage user_geo_location
    const getUserGeoLocation =
      await Security.getUserCityRegionCountry(
        req,
      );
    const createGeoLocation =
      getUserGeoLocation.city !== "" &&
      getUserGeoLocation.region !== "" &&
      getUserGeoLocation.country !== ""
        ? {
            create: {
              ...getUserGeoLocation,
            },
          }
        : {};

    await Prisma.form_item.create({
      data: {
        form_id: formId.id,
        data: schema.data,
        form_item_user_agent: createUserAgent,
        form_item_referer_url: createRefererUrl,
        form_item_geo_localisation:
          createGeoLocation,
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
        timezone: true,
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
        take: 50,
        skip: (currentPage - 1) * 50,
        where: {
          form_id: formId.id,
        },
        select: {
          id: true,
          created_at: true,
          updated_at: true,
          data: true,
          form_item_user_agent: {
            select: { user_agent: true },
          },
          form_item_referer_url: {
            select: { referer_url: true },
          },
          form_item_geo_localisation: {
            select: {
              city: true,
              region: true,
              country: true,
            },
          },
        },
      }),
    ]);

    // refacto object structure
    const items = data[1].map((item) => ({
      id: item.id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      user_agent:
        item.form_item_user_agent?.user_agent ||
        "",
      referer_url:
        item.form_item_referer_url?.referer_url ||
        "",
      geo_localisation: {
        city:
          item.form_item_geo_localisation?.city ||
          "",
        region:
          item.form_item_geo_localisation
            ?.region || "",
        country:
          item.form_item_geo_localisation
            ?.country || "",
      },
      data: item.data,
    }));

    return {
      countAll: data[0],
      items,
      name: formId.name,
      timezone: formId.timezone,
    };
  }

  async deleteItem(
    { key, id }: TFormDeleteItemData,
    userId: string,
  ) {
    const userRole =
      await Prisma.form_user.findMany({
        where: {
          AND: [
            {
              user_id: userId,
            },
            {
              role: "OWNER",
            },
          ],
        },
        select: {
          form: {
            select: {
              key: true,
            },
          },
        },
      });

    if (!userRole)
      throw new AppError(
        "owner role required",
        400,
      );

    if (
      !userRole.some(
        (item) => key === item.form.key,
      )
    )
      throw new AppError(
        "owner role required",
        400,
      );

    const itemId =
      await Prisma.form_item.deleteMany({
        where: {
          id,
        },
      });

    if (!itemId.count)
      throw new AppError("id not found", 400);

    return;
  }

  async deleteManyItem(
    { key, ids }: TFormDeleteManyItemData,
    userId: string,
  ): Promise<void> {
    const userRole =
      await Prisma.form_user.findMany({
        where: {
          AND: [
            {
              user_id: userId,
            },
            {
              role: "OWNER",
            },
          ],
        },
        select: {
          form: {
            select: {
              key: true,
            },
          },
        },
      });

    if (!userRole)
      throw new AppError(
        "owner role required",
        400,
      );

    if (
      !userRole.some(
        (item) => key === item.form.key,
      )
    )
      throw new AppError(
        "owner role required",
        400,
      );

    const itemId =
      await Prisma.form_item.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

    if (!itemId.count)
      throw new AppError("id not found", 400);

    return;
  }

  async editItem(
    {
      key,
      id,
      data,
    }: {
      key: string;
      id: string;
      data: Record<string, string>;
    },
    userId: string,
  ): Promise<void> {
    const userRole =
      await Prisma.form_user.findMany({
        where: {
          AND: [
            {
              user_id: userId,
            },
            {
              role: "OWNER",
            },
          ],
        },
        select: {
          form: {
            select: {
              key: true,
            },
          },
        },
      });

    if (!userRole)
      throw new AppError(
        "owner role required",
        400,
      );

    if (
      !userRole.some(
        (item) => key === item.form.key,
      )
    )
      throw new AppError(
        "owner role required",
        400,
      );

    const formItemData =
      await Prisma.form_item.findUnique({
        where: {
          id,
        },
        select: {
          data: true,
        },
      });

    if (!formItemData?.data)
      throw new AppError("id not found", 400);

    // compare string, not array because [] !== [] (compare array instance, not array values)
    if (
      Object.keys(data).toString() !==
      Object.keys(formItemData.data).toString()
    )
      throw new AppError("data not equal", 400);

    // verify that a data changed
    if (
      Object.values(data).toString() ===
      Object.values(formItemData.data).toString()
    )
      throw new AppError(
        "data must be different",
        400,
      );

    await Prisma.form_item.update({
      where: {
        id,
      },
      data: {
        data,
        updated_at: new Date(),
      },
    });

    return;
  }

  async deleteForm(key: string, id: string) {
    const userRole =
      await Prisma.form_user.findMany({
        where: {
          AND: [
            {
              user_id: id,
            },
            {
              role: "OWNER",
            },
          ],
        },
        select: {
          form: {
            select: {
              key: true,
            },
          },
        },
      });

    if (!userRole)
      throw new AppError(
        "owner role required",
        400,
      );

    if (
      !userRole.some(
        (item) => key === item.form.key,
      )
    )
      throw new AppError(
        "owner role required",
        400,
      );

    // delete form_user and form
    await Prisma.$transaction([
      Prisma.form_user.deleteMany({
        where: {
          form: {
            key,
          },
        },
      }),
      Prisma.form.deleteMany({
        where: {
          key,
        },
      }),
    ]);

    return;
  }
}
