import { PrismaClient } from "@prisma/client";

// types
import { TContactContactData } from "src/utils/type";

// classes
const prisma = new PrismaClient();

export default class ContactService {
  async contact({
    lastName,
    firstName,
    email,
    phone,
    message,
  }: TContactContactData) {
    const contact = await prisma.contact.create({
      data: {
        last_name: lastName,
        first_name: firstName,
        email,
        message,
      },
      select: {
        id: true,
      },
    });

    if (!phone) return;

    await prisma.contact_phone.create({
      data: {
        phone,
        contact_id: contact.id,
      },
      select: { id: true },
    });
  }
}
