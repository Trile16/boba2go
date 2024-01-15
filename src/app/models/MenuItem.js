import { Schema, models, model } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    toppings: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
