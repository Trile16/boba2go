import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (password) => {
        if (!password || password.length < 8) {
          throw Error("Password must be at least 8 characters.");
        }
      },
    },
  },
  { timestamps: true }
);

UserSchema.post("validate", (user) => {
  const password = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);
});

export const User = models?.User || model("User", UserSchema);
