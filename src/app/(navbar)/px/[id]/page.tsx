import ShareDecode from "@/components/px/shareDecode";
import { notFound } from "next/navigation";
import { ShareResponse } from "@/app/(navbar)/px/[id]/interface";
import { cookies } from "next/headers";

async function getData(context: any): Promise<ShareResponse | undefined> {
  //get params from the URL and fetch the data
  const { id } = context.params;
  const cookieStore = cookies();
  const decodeUser = cookieStore.get("x-decode-user");

  let header = {};
  if (decodeUser != undefined) {
    header = {
      cookie: "x-decode-user=" + decodeUser.value,
    };
  }

  const res = await fetch(`${process.env.HOST}/api/px/share/${id}`, {
    next: { revalidate: 5 },
    headers: header,
  });
  if (!res.ok) return undefined;

  return res.json();
}

export default async function Px(context: any) {
  const data = await getData(context);
  if (!data) {
    notFound();
  }

  return (
    <main className={"container h-5/6 mx-auto mb-auto px-3"}>
      <ShareDecode sharePayload={data.data}></ShareDecode>
    </main>
  );
}
