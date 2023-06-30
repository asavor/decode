import { TrashIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

export default function DeleteButton() {
  const router = useRouter();
  const pathName = usePathname();

  function deletePx() {
    fetch(`/api/px/share/${pathName.replace("/px/", "")}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.error) {
          console.log(r.error);
        } else {
          console.log(r);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <TrashIcon
      className="transform transition-transform duration-200 hover:scale-105 cursor-pointer"
      onClick={() => {
        deletePx();
        router.push("/px");
      }}
      width={34}
    />
  );
}
