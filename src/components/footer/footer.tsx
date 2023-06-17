import Link from "next/link";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Footer() {
  return (
    <div
      className={`w-full text-center flex flex-col mt-16 h-18 md:mt-20 md:h-24 ${inter.className}`}
    >
      <a
        className={"text-white text-xl inter font-medium"}
        href={"https://github.com/asavor"}
      >
        github.com/asavor
      </a>
      <Link
        href={"/opensource-tools/credits"}
        className={"text-white text-xl font-semibold"}
      >
        credits
      </Link>
    </div>
  );
}
