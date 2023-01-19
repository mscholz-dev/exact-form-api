import Validator from "./Validator.js";
import RegexClass from "../Regex.js";

// types
import { TContactContactData } from "../type.js";

// classes
const Regex = new RegexClass();

export default class ContactValidator extends Validator {
  inspectContactData(
    data: TContactContactData,
  ): TContactContactData {
    const schema = {
      lastName: "",
      firstName: "",
      email: "",
      phone: "",
      message: "",
    };

    data = {
      ...data,
      phone: this.formatPhone(data.phone || ""),
    };

    this.inspectData(
      schema,
      data,
      this.errorMessage,
    );

    return schema;
  }

  errorMessage(
    id: string,
    value: string,
  ): string {
    switch (id) {
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

      // email
      case "email":
        if (!value) return "email required";
        if (value.length > 255)
          return "email too long";
        if (!Regex.email(value))
          return "email invalid";
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
