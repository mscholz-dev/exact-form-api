import Validator from "./Validator.js";
import timezone from "../timezone.json" assert { type: "json" };
import AppError from "../AppError.js";
import { isValidObjectId } from "mongoose";

// types
import {
  TFormCreateData,
  TFormGetAllQuery,
  TFormCreateItemData,
  TFormGetSpecificFormData,
  TFormDeleteItemData,
} from "../types.js";

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
    data: Record<string, any>,
  ) {
    const schema = {
      key: "",
    };

    // TODO: update testing verif 0, false, array, JSON

    const newData: Record<string, string> = {};

    // transform data type's into string
    for (const item in data) {
      if (typeof data[item] === "object")
        newData[item] = JSON.stringify(
          data[item],
        );
      else newData[item] = data[item].toString();
    }

    this.inspectData(
      schema,
      { key },
      this.errorMessage,
    );

    if (!Object.keys(data).length)
      throw new AppError("data required", 400);

    if (data["created_at" as keyof object])
      throw new AppError(
        "key created_at is forbidden",
        400,
      );

    const secureData =
      this.secureObjectData(newData);

    return {
      key: schema.key,
      data: secureData,
    } as TFormCreateItemData;
  }

  inspectGetSpecificForm(
    key: string,
    { page }: { page?: number },
  ): TFormGetSpecificFormData {
    const schema = {
      key: "",
      page: "",
    };

    this.inspectData(
      schema,
      { key, page },
      this.errorMessage,
    );

    return schema;
  }

  inspectDeleteItemData(
    data: TFormDeleteItemData,
  ) {
    const schema = {
      key: "",
      id: "",
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

      // id
      case "id":
        if (!isValidObjectId(value))
          return "id invalid";
        return "";

      // default
      default:
        return "error";
    }
  }
}
