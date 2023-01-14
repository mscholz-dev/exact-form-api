import AppError from "../utils/AppError.js";
import SecurityClass from "../utils/Security.js";

// types
import { TInspectData } from "./type.js";

// classes
const Security = new SecurityClass();

export default class Validator {
  inspectData(
    schema: TInspectData,
    data: TInspectData,
    validFunc: Function,
  ): void {
    Object.entries(schema).forEach((item) => {
      const errorMessage = validFunc(
        item[0],
        data[item[0] as keyof TInspectData] || "",
      );

      if (errorMessage.length !== 0)
        throw new AppError(errorMessage, 400);

      schema[item[0] as keyof TInspectData] =
        Security.xss(
          data[item[0] as keyof TInspectData],
        );
    });
  }
}
