import fs from "fs";
import nodemailer from "nodemailer";
import AppError from "../AppError.js";

// types
import { TContactTemplate } from "../type.js";

export default class Email {
  send(
    emailDest: string,
    emailSubject: string,
    emailMessageHtml: string,
  ) {
    return new Promise(
      async (resolve, reject) => {
        const transporter =
          nodemailer.createTransport({
            host:
              String(process.env.MAILER_HOST) ||
              "",
            port:
              Number(process.env.MAILER_PORT) ||
              0,
            secure: true,
            auth: {
              user:
                String(process.env.MAILER_USER) ||
                "",
              pass:
                String(
                  process.env.MAILER_PASSWORD,
                ) || "",
            },
            service: "gmail",
          });

        const info = await transporter.sendMail({
          from: process.env.MAILER_USER, // sender address
          to: emailDest, // list of receivers => "email@email.com, email@email.com"
          subject: emailSubject, // subject
          text: "", // plain text body
          html: emailMessageHtml, // html body
        });

        resolve(info);
      },
    );
  }

  async contactTemplate({
    headTitle,
    lastName,
    firstName,
    email,
    phone,
    message,
    locale,
  }: TContactTemplate) {
    let emptyPhone = "";

    switch (locale) {
      case "fr":
        emptyPhone = "non renseigné";
        break;

      case "en":
        emptyPhone = "not specified";
        break;

      default:
        if (!locale)
          throw new AppError(
            "locale required",
            400,
          );
        throw new AppError("locale invalid", 400);
    }

    const fileAdmin = fs
      .readFileSync(
        `./src/utils/email/${locale}/contact.admin.html`,
      )
      .toString();

    const fileHtmlAdmin = fileAdmin
      .replace("$headTitle", headTitle)
      .replace("$lastName", lastName)
      .replace("$firstName", firstName)
      .replace("$email", email)
      .replace("$phone", phone || emptyPhone)
      .replace("$message", message);

    await this.send(
      process.env.MAILER_USER || "",
      headTitle,
      fileHtmlAdmin,
    );

    const fileClient = fs
      .readFileSync(
        `./src/utils/email/${locale}/contact.client.html`,
      )
      .toString();

    const fileHtmlClient = fileClient
      .replace("$headTitle", headTitle)
      .replace("$lastName", lastName)
      .replace("$firstName", firstName)
      .replace("$email", email)
      .replace("$phone", phone || emptyPhone)
      .replace("$message", message);

    await this.send(
      email,
      headTitle,
      fileHtmlClient,
    );
  }
}
