import { pxEncodedPayload } from "@/components/px/constant/pxEncodedPayload";
import { pxDecodedPayload } from "@/components/px/constant/pxDecodedPayload";
export default function InputTextArea({
  decode,
  payload,
  updatePayload,
}: {
  decode: number;
  payload: string;
  updatePayload: any;
}) {
  return (
    <textarea
      className={
        "bg-gradient-to-b from-darkCustomColour to-[#0c0a16] basis-1/2 rounded-md focus:ring-0 focus:outline-0 resize-none text-white p-2 h-full"
      }
      onChange={updatePayload}
      placeholder={decode ? pxEncodedPayload : pxDecodedPayload}
      disabled={false}
      value={payload}
    ></textarea>
  );
}
