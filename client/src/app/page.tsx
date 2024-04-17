import Image from "next/image";
import SAFE_SPACE_LOGO from "../resources/safe_space_logo.jpg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <Image src={SAFE_SPACE_LOGO} alt="safe space logo" className="h-[60px] w-[60px]" />
      <p className="text-5xl">Safe Space</p>
    </main>
  );
}
