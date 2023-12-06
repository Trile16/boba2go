import Image from "next/image";
import MenuItem from "./MenuItem";

export default function HomeMenu() {
  return (
    <section className="border-b border-secondary-1 p-8">
      <h1 className="text-4xl text-center py-8 ">
        Take a look at our{" "}
        <span className="text-primary font-semibold uppercase">Menu</span>
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        <MenuItem name={"Brown Sugar Milk Tea"} img={"/boba.png"} />
        <MenuItem name={"Matcha Milk Tea"} img={"/matcha.png"} />
        <MenuItem name={"Taro Milk Tea"} img={"/taro.png"} />
        <MenuItem name={"Thai Tea"} img={"/thai.png"} />
        <MenuItem name={"Wintermelon Milk Tea"} img={"/wintermelon.png"} />
        <MenuItem name={"Strawberry Tea"} img={"/strawberry.png"} />
        <MenuItem name={"Honeydew Tea"} img={"/honeydew.png"} />
        <MenuItem name={"Ube Milk Tea"} img={"/ube.png"} />
        <MenuItem name={"Green Milk Tea"} img={"/greentea.png"} />
      </div>
    </section>
  );
}
