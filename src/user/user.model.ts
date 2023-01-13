import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["CLIENT", "ADMIN", "SUPER_ADMIN"],
      default: "CLIENT",
    },
    password: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    updated_at: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "user" },
);

export default mongoose.model(
  "userModel",
  UserSchema,
);
