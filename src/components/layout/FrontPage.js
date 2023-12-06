import Image from "next/image";
import RightArrow from "../icons/RightArrow";

export default function FrontPage() {
  return (
    <section className="frontPage border-b border-secondary-1 pb-8">
      <div className="py-12">
        <h1 className="text-4xl font-bold leading-tight">
          Welcome to <br />
          <span className="text-primary">BOBA 2 GO</span>
          <br />
          Sip & Savor,
          <br />
          Delivered to
          <br />
          Your Doorstep!
          <br />
        </h1>
        <p className="text-secondary-1 text-lg my-6">
          Sip, smile, repeat! A tasty treat in the cold or in the heat!
        </p>
        <div className="flex gap-6 text-md">
          <button className="flex gap-1 items-center bg-primary p-4 px-6 py-3 text-white rounded-xl ">
            Order Now
            <RightArrow />
          </button>
          <button className="text-secondary-1 gap-2 py-2 font-semibold">
            Learn More
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/boba.png"}
          objectFit={"contain"}
          layout={"fill"}
          alt="boba"
        />
      </div>
    </section>
  );
}
