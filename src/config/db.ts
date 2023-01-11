import mongoose from "mongoose";

const connectDB = () => {
  try {
    if (!process.env.MONGO_URI)
      throw new Error(
        "process.env.MONGO_URI not defined",
      );

    mongoose.connect(
      process.env.MONGO_URI,
      {},
      () => {
        console.log(`MongoDB connected`);
      },
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
