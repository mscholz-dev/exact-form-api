import AppError from "../utils/AppError.js";
import SecurityClass from "../utils/Security.js";

// class
const Security = new SecurityClass();

type InspectData = {
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
};

export default class Validator {
  inspectData(
    schema: InspectData,
    data: InspectData,
    validFunc: Function,
  ): void {
    Object.entries(schema).forEach((item) => {
      const errorMessage = validFunc(
        item[0],
        data[item[0] as keyof InspectData] || "",
      );

      if (errorMessage.length !== 0)
        throw new AppError(errorMessage, 400);

      schema[item[0] as keyof InspectData] =
        Security.xss(
          data[item[0] as keyof InspectData],
        );
    });
  }
}
