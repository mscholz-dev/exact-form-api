import { PrismaClient } from "@prisma/client";

// types
import { TContactContactData } from "../utils/types";

// classes
const Prisma = new PrismaClient();

export default class ContactService {
  async create({
    lastName,
    firstName,
    email,
    phone,
    message,
  }: TContactContactData) {
    const createPhoneObject = phone
      ? {
          create: {
            phone,
          },
        }
      : {};

    await Prisma.contact.create({
      data: {
        last_name: lastName,
        first_name: firstName,
        email,
        message,
        contact_phone: createPhoneObject,
      },
      select: {
        id: true,
      },
    });
  }
}
