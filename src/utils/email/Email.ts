import fs from "fs";
import nodemailer from "nodemailer";

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
  }: TContactTemplate) {
    const fileAdmin = fs
      .readFileSync(
        `./src/utils/email/contact.admin.html`,
      )
      .toString();

    const fileHtmlAdmin = fileAdmin
      .replace("$headTitle", headTitle)
      .replace("$lastName", lastName)
      .replace("$firstName", firstName)
      .replace("$email", email)
      .replace("$phone", phone || "non renseigné")
      .replace("$message", message);

    await this.send(
      process.env.MAILER_USER || "",
      headTitle,
      fileHtmlAdmin,
    );

    const fileClient = fs
      .readFileSync(
        `./src/utils/email/contact.client.html`,
      )
      .toString();

    const fileHtmlClient = fileClient
      .replace("$headTitle", headTitle)
      .replace("$lastName", lastName)
      .replace("$firstName", firstName)
      .replace("$email", email)
      .replace("$phone", phone || "non renseigné")
      .replace("$message", message);

    await this.send(
      email,
      headTitle,
      fileHtmlClient,
    );
  }
}