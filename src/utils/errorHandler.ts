import AppError from "./AppError.js";
import {
  Request,
  Response,
  NextFunction,
} from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/index.js";
import ErrorControllerClass from "../error/error.controller.js";

// classes
const ErrorController =
  new ErrorControllerClass();

const errorHandler = async (
  err: {
    statusCode?: number;
    message?: string;
    stack?: string;
  },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    err instanceof
      PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    let errorMessage = "";

    switch (err?.meta?.target) {
      case "user_username_key":
        errorMessage = "username already exists";
        break;

      case "user_email_key":
        errorMessage = "email already exists";
        break;

      default:
        break;
    }

    return res.status(400).json({
      message: errorMessage,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  // store stack error in DB
  await ErrorController.create(
    err.stack as string,
  );

  console.log(err.stack);

  return res
    .status(500)
    .send("Something went wrong");
};

export default errorHandler;
