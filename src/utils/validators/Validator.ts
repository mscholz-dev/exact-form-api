import AppError from "../AppError.js";
import SecurityClass from "../Security.js";

// types
import { TInspectData } from "../types.js";

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

  formatPhone(string: string): string {
    return string
      .replace("+33", "0")
      .split(" ")
      .join("");
  }
}
