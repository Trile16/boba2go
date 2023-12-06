"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function Profile() {
  const session = useSession();
  const { status } = session;
  const userImage = session?.data?.user?.image;
  console.log({ session });

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="mt-8">
      <h1 className="text-4xl text-center  text-primary font-semibold uppercase">
        Profile
      </h1>
      <form className="max-w-md mx-auto border">
        <div className="flex gap-2 items-center ">
          <div>
            <Image
              src={userImage}
              height={72}
              width={72}
              alt={"avatar"}
            ></Image>
            <button className="my-0">Change Avatar</button>
          </div>
          <div className="grow">
            <input type="text" placeholder="First and Last Name" />
            <button className="my-0" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
