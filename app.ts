//config
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import express, {
  Request,
  Response,
  NextFunction,
} from "express";
const app = express();
const server = http.createServer(app);
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
// import multer from "multer";
// const upload = multer();

// error
import errorHandler from "./src/utils/errorHandler.js";

// express router
import userRouter from "./src/user/user.route.js";

// bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "test")
  app.use(morgan("dev"));

app.use(express.static("public"));

// cors
app.use(
  cors({
    origin: true,
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
