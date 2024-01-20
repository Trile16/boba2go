import { useState, useEffect } from "react";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemsPriceProps";
import toast from "react-hot-toast";

export default function MenuItemForm({
  menuItem,
  onSubmit,
  type,
  setRedirectToMenuItems,
}) {
  console.log(menuItem);
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [toppings, setToppings] = useState(menuItem?.toppings || []);

  useEffect(() => {
    setImage(menuItem?.image);
    setName(menuItem?.name);
    setDescription(menuItem?.description);
    setBasePrice(menuItem?.basePrice);
    setSizes(menuItem?.sizes || []);
    setToppings(menuItem?.toppings || []);
  }, [menuItem]);

  async function handleMenuItemDelete() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch(`/api/menuitems?_id=${menuItem._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting Item...",
      success: "Item Successfully Deleted!",
      error: "Error Deleting Item...",
    });

    setRedirectToMenuItems(true);
  }

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, { image, name, description, basePrice, sizes, toppings })
      }
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
          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add Item Size"}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Additional Toppings"}
            addLabel={"Add Additional Toppings"}
            props={toppings}
            setProps={setToppings}
          />
          <button type="submit">Save</button>
          {type === "edit" && (
            <div className="mt-2">
              <button type="button" onClick={() => handleMenuItemDelete()}>
                Delete Menu Item
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
