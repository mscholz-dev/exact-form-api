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
    // disable cors domain restriction
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
app.use("/api/contact", contactRouter);

if (process.env.NODE_ENV !== "prod")
  app.use("/api/test", testRouter);

app.use("/api/auth", authRouter);
app.use("/api/form", formRouter);

app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.contentType("html").send(`
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="favicon.ico" />
    <title>Exact Form API</title>
    <style type="text/css">
      html,
      body {
        height: 100vh;
        margin: 0;
        overflow: hidden;
        padding: 0;
        width: 100vw;
      }

      main {
        animation: rainbow 18s ease infinite;
        background: linear-gradient(
          124deg,
          #ff2400,
          #e81d1d,
          #e8b71d,
          #e3e81d,
          #1de840,
          #1ddde8,
          #2b1de8,
          #dd00f3,
          #dd00f3
        );
        background-size: 1800% 1800%;
        bottom: 0;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
      }

      div {
        margin: 0 auto 24px;
        padding: 0 12px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      h1,
      a {
        color: white;
        font-family: sans-serif;
        font-size: 32px;
        margin: 0;
        padding: 0;
      }

      h1 {
        font-size: 48px;
        text-align: center;
      }

      a {
        font-size: 32px;
      }

      @keyframes rainbow {
        0% {
          background-position: 0% 82%;
        }
        50% {
          background-position: 100% 19%;
        }
        100% {
          background-position: 0% 82%;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <div>
        <h1>Créé par Morgan Scholz avec ❤️</h1>
      </div>
      <div>
        <a href="https://mscholz.dev" target="_blank">https://mscholz.dev</a>
      </div>
      <div>
        <a href="mailto:mscholz.dev@gmail.com" target="_blank"
          >mscholz.dev@gmail.com</a
        >
      </div>
    </main>
  </body>
</html>

  `);
});

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
