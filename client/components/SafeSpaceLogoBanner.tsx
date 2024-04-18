import Image from "next/image";
import SAFE_SPACE_LOGO from "../public/safe_space_logo.jpg";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-start">
      <Image src={SAFE_SPACE_LOGO} alt="safe space logo" className="h-[60px] w-[60px] animate-bounce" />
      <p className="text-5xl">Safe Space</p>
    </section>
  );
}
