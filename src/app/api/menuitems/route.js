import mongoose from "mongoose";
import { MenuItem } from "../../models/MenuItem";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const menuItemForm = await MenuItem.create(data);
  return Response.json(menuItemForm);
}
