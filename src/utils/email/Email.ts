import fs from "fs";
import nodemailer from "nodemailer";
import AppError from "../AppError.js";
import LinkHelperClass from "../LinkHelper.js";

// types
import {
  TContactContactData,
  TUserCreateData,
  TNewIP,
  TUserUpdateEmailData,
  TFormCreateData,
} from "../types.js";

// classes
const LinkHelper = new LinkHelperClass();

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
          from: process.env.MAILER_USER as string,
          to: emailDest,
          subject: `EXACT FORM • ${emailSubject}`,
          text: "",
          html: emailMessageHtml,
        });

        resolve(info);
      },
    );
  }

  async contactCreateTemplate({
    lastName,
    firstName,
    email,
    phone,
    message,
    locale,
  }: TContactContactData) {
    if (process.env.NODE_ENV !== "prod") return;

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

    const fileCompany = fs
      .readFileSync(
        `./src/utils/email/fr/contact/contact.company.html`,
      )
      .toString();

    const fileHtmlCompany = fileCompany
      .replace("$headTitle", headTitle)
      .replace("$lastName", lastName)
      .replace("$firstName", firstName)
      .replace("$email", email)
      .replace("$phone", phone || emptyPhone)
      .replace("$message", message)
      .replace("$locale", locale);

    await this.send(
      process.env.MAILER_USER as string,
      headTitle,
      fileHtmlCompany,
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

  async userCreateTemplate({
    username,
    email,
    locale,
  }: TUserCreateData) {
    if (process.env.NODE_ENV !== "prod") return;

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

  async userNewIp(
    { email, locale }: TNewIP,
    ip: string,
  ) {
    if (process.env.NODE_ENV !== "prod") return;

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

  async userCreateEmailTokenTemplate(
    email: string,
    locale: string,
    token: string,
  ) {
    if (process.env.NODE_ENV !== "prod") return;

    let headTitle = "";

    switch (locale) {
      case "fr":
        headTitle =
          "DEMANDE DE CHANGEMENT D'EMAIL";
        break;

      case "en":
        headTitle = "EMAIL CHANGE REQUEST";
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
        `./src/utils/email/${locale}/token/change-email.client.html`,
      )
      .toString();

    const fileHtmlClient = fileClient
      .replace("$headTitle", headTitle)
      .replace(
        "$link",
        `${
          process.env.BASE_URL_FRONT
        }${LinkHelper.translate(
          locale,
          "change-email",
        )}/${token}`,
      );

    await this.send(
      email,
      headTitle,
      fileHtmlClient,
    );
  }

  async userUpdateEmailTemplate({
    locale,
    newEmail,
  }: TUserUpdateEmailData) {
    if (process.env.NODE_ENV !== "prod") return;

    let headTitle = "";

    switch (locale) {
      case "fr":
        headTitle = "NOUVELLE EMAIL";
        break;

      case "en":
        headTitle = "NEW EMAIL";
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
        `./src/utils/email/${locale}/token/new-email.client.html`,
      )
      .toString();

    const fileHtmlClient = fileClient.replace(
      "$headTitle",
      headTitle,
    );

    await this.send(
      newEmail,
      headTitle,
      fileHtmlClient,
    );
  }

  async formCreateTemplate(
    { name, timezone, locale }: TFormCreateData,
    email: string,
  ) {
    if (process.env.NODE_ENV !== "prod") return;

    let headTitle = "";

    switch (locale) {
      case "fr":
        headTitle = "NOUVEAU FORMULAIRE";
        break;

      case "en":
        headTitle = "NEW FORM";
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
        `./src/utils/email/${locale}/form/new-form.client.html`,
      )
      .toString();

    const fileHtmlClient = fileClient
      .replace("$headTitle", headTitle)
      .replace("$name", name)
      .replace(
        "$timezone",
        timezone.replace("_", ""),
      );

    await this.send(
      email,
      headTitle,
      fileHtmlClient,
    );
  }
}
