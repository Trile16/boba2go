"use client";
import Link from "next/link";
import UserIcon from "../icons/UserIcon";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Header() {
  const session = useSession();
  console.log(session);
  const [userName, setUserName] = useState(
    session.data?.user?.name || session.data?.user?.email
  );

  if (userName?.includes(" ")) {
    setUserName(userName.split(" ")[0]);
  }

  useEffect(() => {
    setUserName(session?.data?.user?.name);
    if (userName?.includes(" ")) {
      setUserName(userName.split(" ")[0]);
    }
  }, [session]);

  return (
    <header className="flex items-center justify-between mb-8">
      <Link className="text-primary font-bold text-2xl" href="">
        BOBA 2 GO
      </Link>
      <nav className="flex text-secondary-1 gap-6 font-semibold items-center">
        <Link href={"/"}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
        {session.status === "authenticated" ? (
          <>
            <Link className="whitespace-nowrap" href="/profile">
              Hi, {userName}
            </Link>
            <button
              className="bg-primary p-4 px-6 py-3 text-white rounded-xl flex items-center gap-1"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            className="bg-primary p-4 px-6 py-3 text-white rounded-xl flex items-center gap-1"
            href={"/login"}
          >
            Login
            <UserIcon />
          </Link>
        )}
      </nav>
    </header>
  );
}
