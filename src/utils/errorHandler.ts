import AppError from "./AppError.js";
import {
  Request,
  Response,
  NextFunction,
} from "express";

type MongoError = {
  code: number;
  keyPattern: {};
};

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
  // console.log(error);

  if (
    err.name === "MongoServerError" &&
    (err as MongoError).code === 11000
  ) {
    const mongoError = err as MongoError;

    let errorMessage = "";

    if (
      mongoError.keyPattern.hasOwnProperty(
        "username",
      )
    ) {
      errorMessage = "username already exists";
    } else if (
      mongoError.keyPattern.hasOwnProperty(
        "email",
      )
    ) {
      errorMessage = "email already exists";
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

  return res
    .status(500)
    .send("Something went wrong");
};

export default errorHandler;
