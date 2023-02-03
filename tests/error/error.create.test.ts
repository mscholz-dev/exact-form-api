import data from "../config/data.js";
import ErrorControllerClass from "../../src/error/error.controller.js";

// classes
const ErrorController =
  new ErrorControllerClass();

describe(`Action: create`, () => {
  it("it should create an error", async () => {
    await ErrorController.create(data.errorStack);
  });
});
