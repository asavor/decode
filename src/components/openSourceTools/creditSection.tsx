import React from "react";
import { CreditList } from "@/components/openSourceTools/constant/creditList";
import Link from "next/link";

const CreditSection = () => {
  return (
    <div className="p-10">
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">
          Home
        </Link>{" "}
        / <span className="text-gray-500">Credits</span>
      </div>
      <h1 className="text-2xl font-bold mb-4">Credits</h1>
      <ul className={"pl-2"}>
        {CreditList.map((contributor, index) => (
          <li key={index} className="mb-4">
            <h2 className="text-lg font-bold">{contributor.projectName}</h2>
            <p>{contributor.description}</p>
            <a
              href={contributor.github}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {contributor.github}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreditSection;
