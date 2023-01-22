import fs from "fs";
import nodemailer from "nodemailer";
import AppError from "../AppError.js";

// types
import {
  TContactContactData,
  TUserCreateData,
  TNewIP,
} from "../type.js";

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
          from: process.env.MAILER_USER,
          to: emailDest,
          subject: `EXACT FORM • ${emailSubject}`,
          text: "",
          html: emailMessageHtml,
        });

        resolve(info);
      },
    );
  }

  async contactTemplate({
    lastName,
    firstName,
    email,
    phone,
    message,
    locale,
  }: TContactContactData) {
    let headTitle = "";
    let emptyPhone = "";

    switch (locale) {
      case "fr":
        headTitle = "CONTACT";
        emptyPhone = "non renseigné";
        break;

      case "en":
        headTitle = "CONTACT";
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
        `./src/utils/email/fr/contact/contact.admin.html`,
      )
      .toString();

    const fileHtmlAdmin = fileAdmin
      .replace("$headTitle", headTitle)
      .replace("$lastName", lastName)
      .replace("$firstName", firstName)
      .replace("$email", email)
      .replace("$phone", phone || emptyPhone)
      .replace("$message", message)
      .replace("$locale", locale);

    await this.send(
      process.env.MAILER_USER || "",
      headTitle,
      fileHtmlAdmin,
    );

    const fileClient = fs
      .readFileSync(
        `./src/utils/email/${locale}/contact/contact.client.html`,
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

  async signUpTemplate({
    username,
    email,
    locale,
  }: TUserCreateData) {
    let headTitle = "";

    switch (locale) {
      case "fr":
        headTitle = "INSCRIPTION";
        break;

      case "en":
        headTitle = "SIGN UP";
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
        `./src/utils/email/fr/signup/signup.admin.html`,
      )
      .toString();

    const fileHtmlAdmin = fileAdmin
      .replace("$headTitle", headTitle)
      .replace("$username", username)
      .replace("$email", email)
      .replace("$locale", locale);

    await this.send(
      process.env.MAILER_USER || "",
      headTitle,
      fileHtmlAdmin,
    );

    const fileClient = fs
      .readFileSync(
        `./src/utils/email/${locale}/signup/signup.client.html`,
      )
      .toString();

    const fileHtmlClient = fileClient
      .replace("$headTitle", headTitle)
      .replace("$username", username)
      .replace("$email", email);

    await this.send(
      email,
      headTitle,
      fileHtmlClient,
    );
  }

  async newIP(
    { email, locale }: TNewIP,
    ip: string,
  ) {
    let headTitle = "";

    switch (locale) {
      case "fr":
        headTitle = "NOUVELLE CONNEXION INCONNUE";
        break;

      case "en":
        headTitle = "UNKNOWN NEW CONNECTION";
        break;

      default:
        if (!locale)
          throw new AppError(
            "locale required",
            400,
          );
        throw new AppError("locale invalid", 400);
    }

    const fileClient = fs
      .readFileSync(
        `./src/utils/email/${locale}/ip/new-ip.client.html`,
      )
      .toString();

    const fileHtmlClient = fileClient
      .replace("$headTitle", headTitle)
      .replace("$ip", ip);

    await this.send(
      email,
      headTitle,
      fileHtmlClient,
    );
  }
}
