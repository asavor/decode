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
          className="button min-w-full mx-3 text-center rounded-lg border py-2 px-2 place-self-center  hover:bg-gradient-to-r from-white via-purple-200 to-white text-white"
          href={projectUrl.length == 1 ? projectUrl[0] : projectUrl[1]}
          target="_blank"
        >
          {projectName}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block h-4 w-4 mb-1 ml-1"
            viewBox="0 0 512 512"
          >
            <path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
          </svg>
        </a>
      ) : (
        <div className="flex flex-row">
          {projectUrl.map((url, index) => (
            <a
              key={index}
              className="button mx-1 text-center rounded-lg border py-2 px-4 place-self-center  hover:bg-gradient-to-r from-white via-purple-200 to-white text-white"
              href={projectUrl.length == 1 ? projectUrl[0] : projectUrl[1]}
              target="_blank"
            >
              {index}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
