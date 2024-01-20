"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import RightArrow from "@/components/icons/RightArrow";
import Image from "next/image";

export default function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);
  const { isLoaded: profileLoaded, data: profileData } = useProfile();

  useEffect(() => {
    fetch("/api/menuitems").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  });

  if (!profileLoaded) {
    return "Loading Information...";
  }

  if (!profileData.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs admin={profileData.admin} />
      <div className="mt-8">
        <Link className="button" href={"/menuitems/newitem"}>
          Create New Menu Item
          <RightArrow />
        </Link>
      </div>
      <div>
        {menuItems.length > 0 && (
          <h2 className="text-sm text-gray-500 mt-8">Edit Menu Items</h2>
        )}
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={`/menuitems/edit/${item._id}`}
                className="bg-gray-200 p-4 rounded-lg text-center group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
              >
                <div className="flex justify-center mb-2">
                  <Image src={item.image} alt={""} width={100} height={100} />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
