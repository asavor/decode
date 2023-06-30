import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import { useRouter } from "next/navigation";

const ttlOptions = [
  { time: "1 hour", hourValue: 1 },
  { time: "12 hour", hourValue: 12 },
  { time: "1 day", hourValue: 24 },
  { time: "1 month", hourValue: 24 * 30 },
  { time: "Never", hourValue: 0 },
];

export default function ShareButton({
  payload,
  decode,
}: {
  payload: string;
  decode: boolean;
}) {
  const router = useRouter();

  const handleSelect = (ttlValue: number) => {
    if (payload == "") {
      return;
    }
    fetch(`/api/px/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ttl: ttlValue,
        payload: Buffer.from(payload, "utf8").toString("base64"),
        decode: decode,
      }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.error) {
          console.log(r.error);
        } else {
          router.push("/px/" + r.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="flex items-center space-x-4">
      <div className="relative inline-block text-left">
        <Menu>
          <Menu.Button className="bg-blue-500 w-28 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center">
            <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
            Share
          </Menu.Button>
          <Menu.Items className="absolute mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            {ttlOptions.map((option, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full text-sm px-7 py-2 `}
                    onClick={() => handleSelect(option.hourValue)}
                  >
                    {option.time}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
}
