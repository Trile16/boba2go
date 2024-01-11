"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import RightArrow from "@/components/icons/RightArrow";
import { redirect, useParams } from "next/navigation";

export default function EditMenuItem() {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToMenuItems, setRedirectToMenuItems] = useState(false);
  const { isLoaded: profileLoaded, data: profileData } = useProfile();

  useEffect(() => {
    fetch("/api/menuitems").then((res) => {
      res.json().then((items) => {
        const item = items.find((item) => id === item._id);
        setMenuItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menuitems", {
        method: "PUT",
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

    setRedirectToMenuItems(true);
  }

  if (redirectToMenuItems) {
    return redirect("/menuitems");
  }

  if (!profileLoaded) {
    return "Loading Information....";
  }

  if (!profileData.admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8">
      <UserTabs admin={profileData.admin} />
      <div>
        <Link className="button mt-8 max-w-md mx-auto" href={"/menuitems"}>
          Back to All Menu Items
          <RightArrow />
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
    </section>
  );
}
