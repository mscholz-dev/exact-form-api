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
    <title>Chess ATP API</title>
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
        gap: 24px;
        justify-content: center;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
      }

      div {
        align-items: center;
        display: flex;
        justify-content: center;
        padding: 0 12px;

        &:first-child {
          svg {
            height: 48px;
            margin-right: 6px;
            min-height: 48px;
            min-width: 48px;
            width: 48px;
          }
        }

        svg {
          display: flex;
          height: 32px;
          margin-right: 6px;
          min-height: 32px;
          min-width: 32px;
          width: 32px;
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
        <svg viewBox="0 0 1161 1227" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_441_153)"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 366.162V0L580.5 425.7L1161 0V1223.52L866.285 1006.2V586.454L580.5 794.839L0 366.162ZM0 1226.49L497.146 857.354L297.692 711.485L0 928.8V1226.49Z" fill="url(#paint0_linear_441_153)"/></g><defs><linearGradient id="paint0_linear_441_153" x1="475" y1="310" x2="719.5" y2="1024.5" gradientUnits="userSpaceOnUse"><stop stop-color="#F29E3E"/><stop offset="0.5" stop-color="#FF3D80"/><stop offset="1" stop-color="#944EF6"/></linearGradient><clipPath id="clip0_441_153"><rect width="1161" height="1226.49" fill="white"/></clipPath></defs></svg>
        <h1>Créé par Morgan Scholz avec ❤️</h1>
      </div>
      <div>
        <svg viewBox="0 0 1161 1227" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_441_144)"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 366.162V0L580.5 425.7L1161 0V1223.52L866.285 1006.2V586.454L580.5 794.839L0 366.162ZM0 1226.49L497.146 857.354L297.692 711.485L0 928.8V1226.49Z" fill="url(#paint0_linear_441_144)"/></g><defs><linearGradient id="paint0_linear_441_144" x1="632.5" y1="207.5" x2="892" y2="933.5" gradientUnits="userSpaceOnUse"><stop stop-color="#02FFFF"/><stop offset="0.48" stop-color="#B025FF"/><stop offset="1" stop-color="#F800F7"/></linearGradient><clipPath id="clip0_441_144"><rect width="1161" height="1226.49" fill="white"/></clipPath></defs></svg>
        <a href="https://mscholz.dev" target="_blank">https://mscholz.dev</a>
      </div>
      <div>
        <svg viewBox="0 0 1161 1227" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_441_172)"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 366.162V0L580.5 425.7L1161 0V1223.52L866.285 1006.2V586.454L580.5 794.839L0 366.162ZM0 1226.49L497.146 857.354L297.692 711.485L0 928.8V1226.49Z" fill="url(#paint0_linear_441_172)"/></g><defs><linearGradient id="paint0_linear_441_172" x1="655.5" y1="300" x2="853" y2="958.5" gradientUnits="userSpaceOnUse"><stop stop-color="#40AC33"/><stop offset="0.48" stop-color="#00CF9E"/><stop offset="1" stop-color="#5DEAED"/></linearGradient><clipPath id="clip0_441_172"><rect width="1161" height="1226.49" fill="white"/></clipPath></defs></svg>
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
