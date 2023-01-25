import AppError from "./AppError.js";
import {
  Request,
  Response,
  NextFunction,
} from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/index.js";

const errorHandler = (
  err: {
    name?: string;
    details?: string;
    statusCode?: number;
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

  console.log(err);

  return res
    .status(500)
    .send("Something went wrong");
};

export default errorHandler;
