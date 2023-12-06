"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setUserCreated(true);
      } else {
        setError(true);
      }

      setCreatingUser(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="text-center">
      <h1 className="text-4xl text-center mt-8 text-primary font-semibold uppercase">
        REGISTER
      </h1>
      {userCreated && (
        <div className="my-4">
          Your account has been created, now you can Login{" "}
          <Link href={"/login"} className="text-primary">
            HERE
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4">An error has occured, please try again.</div>
      )}
      <form className="block max-w-sm mx-auto" onSubmit={handleSubmit}>
        <input
          type={"email"}
          placeholder="email"
          disabled={creatingUser}
          onChange={(ev) => setEmail(ev.target.value)}
        ></input>
        <input
          type={"password"}
          placeholder="password"
          disabled={creatingUser}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>
        <button type="submit" disabled={creatingUser}>
          Register
        </button>

        <p>or login with a third party</p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src="/google.png" width={24} height={24} alt="Google Logo" />{" "}
          Login with Google
        </button>
      </form>
      <p className="my-4">
        Already have an account? Login{" "}
        <Link href={"/login"} className="text-primary">
          HERE
        </Link>
      </p>
    </section>
  );
}
