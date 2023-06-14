import Image from "next/image";
import { Monda } from "next/font/google";

const monda = Monda({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export default function ToolsCard({
  projectName,
  projectUrl,
  description,
  imageURI,
  index,
}: {
  projectName: string;
  projectUrl: string[];
  description: string;
  imageURI: string;
  index: number;
}) {
  return (
    <div className="flex flex-col py-3 px-3 bg-[#121929] max-w-[340px] mb-4 rounded-lg place-content-between justify-between mx-auto">
      <div className="flex flex-col">
        {index < 12 ? (
          <Image
            src={imageURI}
            className="object-cover rounded-t-md"
            alt={projectName}
            width={340}
            height={200}
            quality={50}
            priority={true}
            blurDataURL={"/loadingBlur.png"}
            placeholder="blur"
          ></Image>
        ) : (
          <Image
            src={imageURI}
            className="object-cover rounded-t-md"
            alt={projectName}
            width={340}
            height={200}
            quality={75}
            priority={false}
            blurDataURL={"/loadingBlur.png"}
            placeholder="blur"
          ></Image>
        )}
        <h2 className={"text-lg font-bold mt-2 " + monda.className}>
          {projectName}
        </h2>
        <div className={"mt-3 mb-4 text-gray-500 " + monda.className}>
          {description}
        </div>
      </div>
      {projectUrl.length == 1 ? (
        <a
          className="button min-w-full mx-3 text-center rounded-lg border py-2 px-2 place-self-center  hover:bg-gradient-to-r from-white via-purple-200 to-white text-white hover:text-black"
          href={projectUrl.length == 1 ? projectUrl[0] : projectUrl[1]}
          target="_blank"
        >
          {projectName}
        </a>
      ) : (
        <div className="flex flex-row">
          {projectUrl.map((url, index) => (
            <a
              key={index}
              className="button mx-1 text-center rounded-lg border py-2 px-4 place-self-center  hover:bg-gradient-to-r from-white via-purple-200 to-white text-white"
              href={projectUrl.length == 1 ? projectUrl[0] : projectUrl[index]}
              target="_blank"
            >
              {index + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
