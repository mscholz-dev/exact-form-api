import { emailRegex } from "./email.js";
import { phoneRegex } from "./phone.js";

export const handleValidator = (
  id: string,
  value: string,
): string => {
  switch (id) {
    // username
    case "username":
      if (!value.length)
        return "username required";
      if (value.length > 60)
        return "username too long";
      return "";

    // email
    case "email":
      if (!value.length) return "email required";
      if (value.length > 255)
        return "email too long";
      if (!emailRegex.test(value))
        return "email invalid";
      return "";

    // password
    case "password":
      if (!value.length)
        return "password required";
      if (value.length > 60)
        return "password too long";
      return "";

    // password2
    case "password2":
      if (!value.length)
        return "password2 required";
      if (value.length > 60)
        return "password2 too long";
      return "";

    // lastName
    case "lastName":
      if (!value.length)
        return "lastName required";
      if (value.length > 60)
        return "lastName too long";
      return "";

    // firstName
    case "firstName":
      if (!value.length)
        return "firstName required";
      if (value.length > 60)
        return "firstName too long";
      return "";

    // phone
    case "phone":
      if (
        value.length !== 0 &&
        !phoneRegex.test(value)
      )
        return "phone invalid";
      return "";

    // message
    case "message":
      if (!value.length)
        return "message required";
      if (value.length > 10_000)
        return "message too long";
      return "";

    // default
    default:
      return "error";
  }
};
