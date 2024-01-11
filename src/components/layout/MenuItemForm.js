import { useState, useEffect } from "react";
import EditableImage from "@/components/layout/EditableImage";

export default function MenuItemForm({ menuItem, onSubmit }) {
  console.log(menuItem);
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");

  useEffect(() => {
    setImage(menuItem?.image);
    setName(menuItem?.name);
    setDescription(menuItem?.description);
    setBasePrice(menuItem?.basePrice);
  }, [menuItem]);

  console.log(image, name, description, basePrice);

  return (
    <form
      onSubmit={(ev) => onSubmit(ev, { image, name, description, basePrice })}
      className="mt-8 max-w-md mx-auto"
    >
      <div
        className="grid items-start gap-4"
        style={{ gridTemplateColumns: ".25fr .75fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Base Price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
