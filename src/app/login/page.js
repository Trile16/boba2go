"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attemptingLogin, setAttemptingLogin] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(ev) {
    ev.preventDefault();
    setAttemptingLogin(true);
    try {
      await signIn("credentials", { email, password });

      setAttemptingLogin(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="text-center">
      <h1 className="text-4xl text-center mt-8 text-primary font-semibold uppercase">
        Login
      </h1>
      <form className="block max-w-sm mx-auto" onSubmit={handleSubmit}>
        <input
          type={"email"}
          name="email"
          placeholder="email"
          disabled={attemptingLogin}
          onChange={(ev) => setEmail(ev.target.value)}
        ></input>
        <input
          type={"password"}
          name="password"
          placeholder="password"
          disabled={attemptingLogin}
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>
        <button type="submit" disabled={attemptingLogin}>
          Login
        </button>

        <p>or login with a third party</p>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src="/google.png" width={24} height={24} alt="Google Logo" />{" "}
          Login with Google
        </button>
      </form>

      <p>
        Don't have an account? Register{" "}
        <Link href={"/register"} className="text-primary">
          HERE
        </Link>
      </p>
    </section>
  );
}
