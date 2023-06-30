import { pxEncodedPayload } from "@/components/px/constant/pxEncodedPayload";
import { pxDecodedPayload } from "@/components/px/constant/pxDecodedPayload";
import { Dispatch, SetStateAction } from "react";
export default function InputTextArea({
  decode,
  payload,
  setStartPayload,
  disabled,
}: {
  decode: boolean;
  payload: string;
  setStartPayload?: Dispatch<SetStateAction<string>>;
  disabled: boolean;
}) {
  return (
    <textarea
      className={
        "bg-gradient-to-b from-darkCustomColour to-[#0c0a16] basis-1/2 rounded-md focus:ring-0 focus:outline-0 resize-none text-white p-2 h-full"
      }
      // @ts-ignore
      onChange={(e) => setStartPayload(e.target.value)}
      placeholder={decode ? pxEncodedPayload : pxDecodedPayload}
      disabled={disabled}
      value={payload}
    ></textarea>
  );
}
