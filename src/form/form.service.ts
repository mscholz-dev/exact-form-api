import { PrismaClient } from "@prisma/client";
import SecurityClass from "../utils/Security.js";

// types
import { TFormCreateData } from "../utils/type.js";

// classes
const prisma = new PrismaClient();
const Security = new SecurityClass();

export default class FormService {
  async create(
    { name, timezone }: TFormCreateData,
    id: string,
  ): Promise<void> {
    await prisma.form.create({
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
}
