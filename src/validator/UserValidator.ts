import Validator from "./Validator.js";
import RegexClass from "../utils/Regex.js";
import AppError from "../utils/AppError.js";

// types
import { TCreateUserData } from "./type.js";

// classes
const Regex = new RegexClass();

export default class UserValidator extends Validator {
  inspectUserData(data: object): TCreateUserData {
    const schema = {
      username: "",
      email: "",
      password: "",
      password2: "",
    };

    this.inspectData(
      schema,
      data,
      this.errorMessage,
    );

    this.checkPasswords(schema);

    return schema;
  }

  checkPasswords({
    password,
    password2,
  }: TCreateUserData) {
    if (password !== password2)
      throw new AppError(
        "passwords not matching",
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

      // lastName
      case "lastName":
        if (!value) return "lastName required";
        if (value.length > 60)
          return "lastName too long";
        return "";

      // firstName
      case "firstName":
        if (!value) return "firstName required";
        if (value.length > 60)
          return "firstName too long";
        return "";

      // phone
      case "phone":
        if (value && !Regex.phone(value))
          return "phone invalid";
        return "";

      // message
      case "message":
        if (!value) return "message required";
        if (value.length > 10_000)
          return "message too long";
        return "";

      // default
      default:
        return "error";
    }
  }
}
