"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import RightArrow from "@/components/icons/RightArrow";
import { redirect } from "next/navigation";

export default function NewMenuItem() {
  const [redirectToMenuItems, setRedirectToMenuItems] = useState(false);
  const { isLoaded: profileLoaded, data: profileData } = useProfile();

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
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
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
