import jwt from "jsonwebtoken";
import AppError from "./AppError.js";
import errorCode from "./errorCode.js";

type SignJwt = {
  username: string;
  email: string;
};

const jwtOptions = {};

export const signJwt = ({
  username,
  email,
}: SignJwt) => {
  if (!process.env.JWT_SECRET)
    throw new AppError(
      errorCode.TEST,
      "process.env.JWT_SECRET not defined",
      400,
    );

  return jwt.sign(
    JSON.stringify({
      username,
      email,
    }),
    process.env.JWT_SECRET,
    jwtOptions,
  );
};
