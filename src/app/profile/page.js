"use client";
import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Profile() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState(session?.data?.user?.name || "");
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState("");
  console.log({ session });

  useEffect(() => {
    setUserName(session?.data?.user?.name);
    setImage(session?.data?.user?.image);
  }, [session, status]);

  async function handleProfileInfoSubmit(ev) {
    ev.preventDefault();
    setIsSaved(false);
    setIsSaving(true);
    const response = await fetch("api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName, image }),
    });
    setIsSaving(false);
    if (response.ok) {
      setIsSaved(true);
    }
  }

  async function handleFileChange(ev) {
    setIsUploading(true);
    const files = ev.target?.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const link = await response.json();
      setImage(link);
    }
    setIsUploading(false);
  }

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
      {isSaved && (
        <div className="text-center p-4 mx-auto border bg-green-300 max-w-md my-1 rounded-lg border-green-500">
          <h2>Profile Saved!</h2>
        </div>
      )}
      {isSaving && (
        <div className="text-center p-4 mx-auto border bg-gray-300 max-w-md my-1 rounded-lg border-gray-500">
          <h2>Saving...</h2>
        </div>
      )}
      {isUploading && (
        <div className="text-center p-4 mx-auto border bg-gray-300 max-w-md my-1 rounded-lg border-gray-500">
          <h2>Uploading...</h2>
        </div>
      )}
      <div className="max-w-md mx-auto">
        <div className="flex gap-2 items-center ">
          <div>
            {image && (
              <Image
                className="rounded-lg w-full h-full mb-1"
                src={image}
                height={72}
                width={72}
                alt={"avatar"}
              ></Image>
            )}
            <label>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                Edit
              </span>
            </label>
          </div>
          <form className="grow" onSubmit={handleProfileInfoSubmit}>
            <input
              type="text"
              placeholder="First and Last Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input
              type="email"
              placeholder="First and Last Name"
              disabled={true}
              value={session.data.user.email}
            />
            <button className="my-0" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
