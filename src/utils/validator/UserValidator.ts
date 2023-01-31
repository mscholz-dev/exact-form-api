import Validator from "./Validator.js";
import RegexClass from "../Regex.js";
import AppError from "../AppError.js";

// types
import {
  TUserCreateData,
  TUserConnectData,
  TUserUpdateData,
  TUserCreateEmailTokenData,
  TUserUpdateEmailData,
} from "../type.js";

// classes
const Regex = new RegexClass();

export default class UserValidator extends Validator {
  inspectCreateData(
    data: TUserCreateData,
  ): TUserCreateData {
    const schema = {
      username: "",
      email: "",
      password: "",
      password2: "",
      locale: "",
    };

    this.inspectData(
      schema,
      data,
      this.errorMessage,
    );

    this.checkPasswords(
      schema as TUserCreateData,
    );

    return schema as TUserCreateData;
  }

  inspectConnectionData(
    data: TUserConnectData,
  ): TUserConnectData {
    const schema = {
      email: "",
      password: "",
      locale: "",
    };

    this.inspectData(
      schema,
      data,
      this.errorMessage,
    );

    return schema as TUserConnectData;
  }

  inspectUpdateData(
    data: TUserUpdateData,
  ): TUserUpdateData {
    const schema = {
      username: "",
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
    };

    this.inspectData(
      schema,
      data,
      this.errorMessage,
    );

    this.checkChangePasswords(
      schema as TUserUpdateData,
    );

    return schema as TUserUpdateData;
  }

  inspectCreateEmailTokenData(
    data: TUserCreateEmailTokenData,
  ) {
    const schema = {
      locale: "",
    };

    this.inspectData(
      schema,
      data,
      this.errorMessage,
    );

    return schema as TUserCreateEmailTokenData;
  }

  inspectUpdateEmailData(
    data: TUserUpdateEmailData,
    email: string,
  ) {
    const schema = {
      newEmail: "",
      newEmail2: "",
      token: "",
      locale: "",
    };

    this.inspectData(
      schema,
      data,
      this.errorMessage,
    );

    if (schema.newEmail !== schema.newEmail2)
      throw new AppError(
        "emails not matching",
        400,
      );

    if (email === schema.newEmail)
      throw new AppError(
        "newEmail must be different",
        400,
      );

    return schema as TUserUpdateEmailData;
  }

  checkPasswords({
    password,
    password2,
  }: TUserCreateData) {
    if (password !== password2)
      throw new AppError(
        "passwords not matching",
        400,
      );
  }

  checkChangePasswords({
    oldPassword,
    newPassword,
    newPassword2,
  }: TUserUpdateData) {
    if (!oldPassword) return;

    if (!newPassword)
      throw new AppError(
        "newPassword required",
        400,
      );

    if (!newPassword2)
      throw new AppError(
        "newPassword2 required",
        400,
      );

    if (newPassword !== newPassword2)
      throw new AppError(
        "newPasswords not matching",
        400,
      );
  }

  errorMessage(
    id: string,
    value: string,
  ): string {
    switch (id) {
      // username
      case "username":
        if (!value) return "username required";
        if (value.length > 60)
          return "username too long";
        return "";

      // email
      case "email":
        if (!value) return "email required";
        if (value.length > 255)
          return "email too long";
        if (!Regex.email(value))
          return "email invalid";
        return "";

      // newEmail
      case "newEmail":
        if (!value) return "newEmail required";
        if (value.length > 255)
          return "newEmail too long";
        if (!Regex.email(value))
          return "newEmail invalid";
        return "";

      // newEmail2
      case "newEmail2":
        if (!value) return "newEmail2 required";
        if (value.length > 255)
          return "newEmail2 too long";
        if (!Regex.email(value))
          return "newEmail2 invalid";
        return "";

      // password
      case "password":
        if (!value) return "password required";
        if (value.length > 60)
          return "password too long";
        return "";

      // password2
      case "password2":
        if (!value) return "password2 required";
        if (value.length > 60)
          return "password2 too long";
        return "";

      // oldPassword
      case "oldPassword":
        if (value.length > 60)
          return "oldPassword too long";
        return "";

      // newPassword
      case "newPassword":
        if (value.length > 60)
          return "newPassword too long";
        return "";

      // newPassword2
      case "newPassword2":
        if (value.length > 60)
          return "newPassword2 too long";
        return "";

      // message
      case "message":
        if (!value) return "message required";
        if (value.length > 10_000)
          return "message too long";
        return "";

      // locale
      case "locale":
        if (!value) return "locale required";
        if (value !== "fr" && value !== "en")
          return "locale invalid";
        return "";

      // token
      case "token":
        if (!value) return "token required";
        return "";

      // default
      default:
        return "error";
    }
  }
}
