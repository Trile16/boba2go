import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    image: { type: String },
    phone: { type: String },
    streetAddress: { type: String },
    city: { type: String },
    zipCode: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", UserSchema);
