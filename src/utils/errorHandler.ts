import AppError from "./AppError.js";
import {
  Request,
  Response,
  NextFunction,
} from "express";

const errorHandler = (
  error: {
    name?: string;
    details?: string;
    statusCode?: number;
  },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.log(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      message: error.message,
    });
  }

  return res
    .status(500)
    .send("Something went wrong");
};

export default errorHandler;
