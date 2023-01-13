import mongoose from "mongoose";

const connectDB = () =>
  new Promise((resolve, reject): void => {
    try {
      if (!process.env.MONGO_URI)
        throw new Error(
          "process.env.MONGO_URI not defined",
        );

      mongoose.set("strictQuery", false);

      const MONGO_URI = `${
        process.env.MONGO_URI
      }${
        process.env.NODE_ENV === "test"
          ? "_test"
          : ""
      }`;

      mongoose.connect(MONGO_URI, {}, () => {
        resolve(MONGO_URI);
      });
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  });

export default connectDB;
