import mongoose from "mongoose";
import { User } from "../../models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();
  const password = body.password;
  mongoose.connect(process.env.MONGO_URL);
  if (!password || password.length < 8) {
    throw Error("Password must be at least 8 characters.");
  }

  const notHashedPass = password;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPass, salt);

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
