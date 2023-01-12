const process = {
  env: {
    NODE_ENV: "test",
    PORT: "8000",
    BASE_URL_API: "http://localhost:8000",
    BASE_URL_FRONT: "http://localhost:3000",
    MAILER_HOST: "smtp.gmail.com",
    MAILER_PORT: "465",
    MAILER_USER: "",
    MAILER_PASSWORD: "",
    MONGO_URI:
      "mongodb+srv://GoogleMongo:GoogleMongo@cluster0.l56c330.mongodb.net/exact_form",
    JWT_SECRET: "Secret",
  },
};

export default process;
