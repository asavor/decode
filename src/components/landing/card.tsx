import { cardList } from "@/components/landing/constant/card";
import Link from "next/link";

export default function Card() {
  return cardList.map((post, index) => (
    <div key={index} className="overflow-hidden rounded-lg shadow-lg basis-1/3">
      <div className="flex flex-col justify-between bg-white p-6 ">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-900">{post.title}</h1>
          <hr />
          <p className="mt-3 text-base text-gray-500">{post.description}</p>
          {post.link.map((bp, index) => {
            return (
              <Link
                key={index}
                href={bp.href}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-white lg:px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 ml-3 mt-5 shadow-lg"
              >
                {bp.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  ));
}
