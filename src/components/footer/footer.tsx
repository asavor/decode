import Link from "next/link";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Footer() {
  return (
    <div
      className={`w-full text-center flex flex-col mt-20 h-24 ${inter.className}`}
    >
      <a
        className={"text-white text-xl inter font-semibold"}
        href={"https://github.com/asavor"}
      >
        github.com/asavor
      </a>
      <Link href={"credit"} className={"text-white text-xl font-bold"}>
        credits
      </Link>
    </div>
  );
}
