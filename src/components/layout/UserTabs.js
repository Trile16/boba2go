"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ admin }) {
  const path = usePathname();

  return (
    <div className="flex gap-2 tabs justify-center mx-auto my-4">
      <Link className={path === "/profile" ? "active" : ""} href="/profile">
        Profile
      </Link>
      {admin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href="/categories"
          >
            Categories
          </Link>
          <Link
            className={path.includes("/menuitems") ? "active" : ""}
            href="/menuitems"
          >
            Menu Items
          </Link>
          <Link className={path === "/users" ? "active" : ""} href="">
            Users
          </Link>
        </>
      )}
    </div>
  );
}
