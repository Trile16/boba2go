"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MenuItems() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const { isLoaded: profileLoaded, data: profileData } = useProfile();

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = {
      image,
      name,
      description,
      basePrice,
    };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menuitems", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving Menu Item...",
      success: "Menu Item Successfully Saved!",
      error: "Error Saving Menu Item...",
    });
  }

  if (!profileLoaded) {
    return "Loading Information...";
  }

  if (!profileData.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs admin={profileData.admin} />

      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
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
    </section>
  );
}
