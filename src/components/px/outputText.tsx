import { pxEncodedPayload } from "@/components/px/constant/pxEncodedPayload";
import { pxDecodedPayload } from "@/components/px/constant/pxDecodedPayload";

export default function OutputText({
  decode,
  finalPayload,
}: {
  decode: number;
  finalPayload?: string;
}) {
  return (
    <textarea
      className={
        "bg-gradient-to-b from-darkCustomColour to-[#0c0a16] basis-1/2 rounded-md focus:ring-0 focus:outline-0 resize-none text-white p-2 border-[0.5px]"
      }
      placeholder={decode ? pxDecodedPayload : pxEncodedPayload}
      disabled={true}
      value={finalPayload}
    ></textarea>
  );
}