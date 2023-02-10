//config
import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.NODE_ENV === "test"
      ? ".env.test"
      : ".env",
});
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// error
import errorHandler from "./src/utils/errorHandler.js";

// express router
import userRouter from "./src/user/user.route.js";
import contactRouter from "./src/contact/contact.route.js";
import testRouter from "./src/test/test.route.js";
import authRouter from "./src/auth/auth.route.js";
import formRouter from "./src/form/form.route.js";

// bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "test")
  app.use(morgan("dev"));

// app.use(express.static("public"));

// cors
app.use(
  cors({
    origin: process.env.BASE_URL_FRONT,
    credentials: true,
    methods: [
      "GET",
      "PUT",
      "POST",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Origin",
      "Content-Type",
      "Content-Length",
      "X-Requested-With",
      "cache-control",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Origin",
    ],
  }),
);

// add security headers
app.use(helmet());

// api routes
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

if (process.env.NODE_ENV !== "prod")
  app.use("/api/test", testRouter);

app.use("/api/auth", authRouter);
app.use("/api/form", formRouter);

// return error
app.use(errorHandler);

// app ready
if (process.env.NODE_ENV !== "test") {
  server.listen(process.env.PORT, () => {
    console.log(`
  --------------------------------
  Listening on port: ${process.env.PORT}
  --------------------------------
         ___       _____     __
        /   \\     |   _  \\  |  |
       /  ^  \\    |  |_)  | |  |
      /  /_\\  \\   |   ___/  |  |
     /  _____  \\  |  |      |  |
    /__/     \\__\\ |__|      |__|
  --------------------------------
  `);
  });
}

// export Express API
export default app;
