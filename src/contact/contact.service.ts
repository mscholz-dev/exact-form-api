import { PrismaClient } from "@prisma/client";

// types
import { TContactContactData } from "../utils/type";

// classes
const prisma = new PrismaClient();

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

    await prisma.contact.create({
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
