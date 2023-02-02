import ErrorServiceClass from "./error.service.js";

// classes
const ErrorService = new ErrorServiceClass();

export default class ErrorController {
  async create(stack: string): Promise<void> {
    await ErrorService.create(stack);

    return;
  }
}
