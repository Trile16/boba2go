import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import FrontPage from "../components/layout/FrontPage";
import HomeMenu from "../components/layout/HomeMenu";
import About from "../components/layout/About";

export default function Home() {
  return (
    <>
      <FrontPage />
      <HomeMenu />
      <About />
      <section className="text-center">
        <h1 className="text-4xl text-center py-8">
          Any Questions?{" "}
          <span className=" text-primary font-semibold uppercase">Contact</span>{" "}
          Us
        </h1>
        <div className="mt-8 text-secondary-1">
          <a href="tel:+11234567890" className="text-4xl font-bold underline">
            +1 (123) 456-7890
          </a>
        </div>
      </section>
    </>
  );
}
