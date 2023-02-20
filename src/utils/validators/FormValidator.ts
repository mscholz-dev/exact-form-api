import Validator from "./Validator.js";
import timezone from "../timezone.json" assert { type: "json" };
import AppError from "../AppError.js";
import { isValidObjectId } from "mongoose";

// types
import {
  TFormCreateData,
  TFormGetAllQuery,
  TFormCreateItemData,
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
      trash: "",
    };

    this.inspectData(
      schema,
      data,
      this.errorMessage,
    );

    return {
      page: schema.page,
      trash: this.handleBoolean(
        "trash",
        schema.trash,
      ),
    };
  }

  inspectCreateItemData(
    key: string,
    data: Record<string, any>,
  ) {
    const schema = {
      key: "",
    };

    const newData: Record<string, string> = {};

    // transform data type's into string
    for (const item in data) {
      if (typeof data[item] === "object") {
        const stringData = JSON.stringify(
          data[item],
        );

        if (stringData.length > 1_000)
          throw new AppError(
            "data too long",
            400,
          );

        newData[item] = stringData;
      } else {
        const stringData = data[item].toString();

        if (stringData.length > 1_000)
          throw new AppError(
            "data too long",
            400,
          );
        newData[item] = stringData;
      }
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

    if (data["updated_at" as keyof object])
      throw new AppError(
        "key updated_at is forbidden",
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
    {
      page,
      trash,
    }: { page?: number; trash?: string },
  ) {
    const schema = {
      key: "",
      page: "",
      trash: "",
    };

    this.inspectData(
      schema,
      { key, page, trash },
      this.errorMessage,
    );

    return {
      ...schema,
      trash: this.handleBoolean(
        "trash",
        schema.trash,
      ),
    };
  }

  inspectDeleteItemData(
    data: TFormDeleteItemData,
    trash: string,
  ) {
    const schema = {
      key: "",
      id: "",
      trash: "",
    };

    this.inspectData(
      schema,
      { ...data, trash },
      this.errorMessage,
    );

    return {
      ...schema,
      trash: this.handleBoolean(
        "trash",
        schema.trash,
      ),
    };
  }

  inspectDeleteManyItemData(
    key: string,
    data: object & { trash: string },
  ) {
    const schema: {
      ids: string[];
      key: string;
      trash: string;
    } = {
      key: "",
      ids: [],
      trash: "",
    };

    this.inspectData(
      schema,
      { key, trash: data.trash },
      this.errorMessage,
    );

    // reset ids key type
    schema.ids = [];

    if (!Object.values(data).length)
      throw new AppError("query required", 400);

    for (const item in data) {
      if (item !== "trash") {
        if (data[item as keyof object] !== "true")
          throw new AppError(
            "query invalid",
            400,
          );

        if (!isValidObjectId(item))
          throw new AppError("id invalid", 400);

        schema.ids.push(item);
      }
    }

    const secureIds = this.secureArrayData(
      schema.ids,
    );

    return {
      key: schema.key,
      ids: secureIds,
      trash: this.handleBoolean(
        "trash",
        schema.trash,
      ),
    };
  }

  inspectEditItemData(
    key: string,
    id: string,
    data: Record<string, string>,
  ) {
    const schema = {
      key: "",
      id: "",
    };

    const newData: Record<string, string> = {};

    // transform data type's into string
    for (const item in data) {
      if (typeof data[item] === "object") {
        const stringData = JSON.stringify(
          data[item],
        );

        if (stringData.length > 1_000)
          throw new AppError(
            "data too long",
            400,
          );

        newData[item] = stringData;
      } else {
        const stringData = data[item].toString();

        if (stringData.length > 1_000)
          throw new AppError(
            "data too long",
            400,
          );
        newData[item] = stringData;
      }
    }

    this.inspectData(
      schema,
      { key, id },
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

    return { ...schema, data: secureData };
  }

  inspectDeleteFormData(key: string) {
    const schema = {
      key: "",
    };

    this.inspectData(
      schema,
      { key },
      this.errorMessage,
    );

    return schema;
  }

  inspectUpdateFormData(
    key: string,
    {
      name,
      timezone,
    }: { name: string; timezone: string },
  ) {
    const schema = {
      key: "",
      name: "",
      timezone: "",
    };

    this.inspectData(
      schema,
      { key, name, timezone },
      this.errorMessage,
    );

    return schema;
  }

  inspectRecoverItemData(data: object) {
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

  inspectRecoverManyItemData(
    key: string,
    ids: string[],
  ) {
    const schema: { key: string; ids: string[] } =
      {
        key: "",
        ids: [],
      };

    this.inspectData(
      schema,
      { key },
      this.errorMessage,
    );

    // reset ids key type
    schema.ids = [];

    if (ids === undefined || !ids.length)
      throw new AppError("ids required", 400);

    for (const item of ids) {
      if (!isValidObjectId(item))
        throw new AppError("id invalid", 400);

      schema.ids.push(item);
    }

    const secureIds = this.secureArrayData(
      schema.ids,
    );

    return {
      key: schema.key,
      ids: secureIds,
    };
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

      // ids
      case "ids":
        return "";

      // trash
      case "trash":
        return "";

      // default
      default:
        return "error";
    }
  }
}
