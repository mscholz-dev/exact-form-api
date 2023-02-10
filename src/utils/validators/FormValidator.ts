import Validator from "./Validator.js";
import timezone from "../timezone.json" assert { type: "json" };

// types
import {
  TFormCreateData,
  TFormGetAllQuery,
  TFormCreateItemData,
} from "../types.js";
import AppError from "../AppError.js";

export default class FormValidator extends Validator {
  inspectCreateData(
    data: TFormCreateData,
  ): TFormCreateData {
    const schema = {
      name: "",
      timezone: "",
      locale: "",
    };

    this.inspectData(
      schema,
      data,
      this.errorMessage,
    );

    return schema as TFormCreateData;
  }

  inspectGetAllData(
    data: TFormGetAllQuery,
  ): TFormGetAllQuery {
    const schema = {
      page: "",
    };

    this.inspectData(
      schema,
      data,
      this.errorMessage,
    );

    return schema as TFormGetAllQuery;
  }

  inspectCreateItemData(
    key: string,
    data: object,
  ) {
    const schema = {
      key: "",
    };

    this.inspectData(
      schema,
      { key },
      this.errorMessage,
    );

    if (!Object.keys(data).length)
      throw new AppError("data required", 400);

    const secureData =
      this.secureObjectData(data);

    return {
      key: schema.key,
      data: secureData,
    } as TFormCreateItemData;
  }

  errorMessage(
    id: string,
    value: string,
  ): string {
    switch (id) {
      // name
      case "name":
        if (!value) return "formName required";
        if (value.length > 60)
          return "formName too long";
        return "";

      // timezone
      case "timezone":
        if (!value) return "timezone required";
        if (
          !timezone.some(
            ({ name }) => name === value,
          )
        )
          return "timezone invalid";
        return "";

      // locale
      case "locale":
        if (!value) return "locale required";
        if (value !== "fr" && value !== "en")
          return "locale invalid";
        return "";

      // page
      case "page":
        if (!value) return "page required";
        if (Number(value) <= 0)
          return "page must be greater than 0";
        if (isNaN(Number(value)))
          return "page must be a number";
        return "";

      // key
      case "key":
        return "";

      // default
      default:
        return "error";
    }
  }
}
