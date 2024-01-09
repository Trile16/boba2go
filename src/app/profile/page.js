"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";

export default function Profile() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState(session?.data?.user?.name || "");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [admin, setAdmin] = useState("");
  const [image, setImage] = useState("");
  const [isFetched, setIsFetched] = useState(false);

  console.log({ session });

  useEffect(() => {
    setUserName(session?.data?.user?.name);
    setImage(session?.data?.user?.image);
    fetch("api/profile").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setPhone(data.phone);
        setStreetAddress(data.streetAddress);
        setCity(data.city);
        setZipCode(data.zipCode);
        setCountry(data.country);
        setAdmin(data.admin);
        setIsFetched(true);
      });
    });
  }, [session, status]);

  async function handleProfileInfoSubmit(ev) {
    ev.preventDefault();

    const toastLoading = toast.loading("Saving Profile...");

    const response = await fetch("api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        image,
        phone,
        streetAddress,
        city,
        zipCode,
        country,
      }),
    });

    toast.dismiss(toastLoading);

    if (response.ok) {
      toast.success("Profile Saved!");
    } else {
      toast.error("Error Saving Profile...");
    }
  }

  if (status === "loading" || !isFetched) {
    return "Loading Information...";
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="mt-8">
      <UserTabs admin={admin} />

      <div className="max-w-md mx-auto">
        <div className="flex flex-col gap-2 items-center">
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <form className="grow" onSubmit={handleProfileInfoSubmit}>
            <label>First and Last Name</label>
            <input
              type="text"
              placeholder="First and Last Name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              disabled={true}
              value={session.data.user.email}
            />
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <span className="flex gap-2">
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
              <div>
                <label>Zip Code</label>
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(ev) => setZipCode(ev.target.value)}
                />
              </div>
            </span>
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
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
