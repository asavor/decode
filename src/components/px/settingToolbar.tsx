import SettingButton from "@/components/px/settingButton";
import { Dropdown } from "@/components/px/dropdown";
import { Dispatch, SetStateAction } from "react";
import JsonOrderToggleButton from "@/components/px/jsonOrderToggleButton";

export default function SettingToolBar({
  decode,
  setDecode,
  sts,
  setSts,
  uuid,
  setUuid,
  orderPayloadKey,
  setOrderPayloadKey,
}: {
  decode: number;
  setDecode: Dispatch<SetStateAction<number>>;
  sts: string;
  setSts: Dispatch<SetStateAction<string>>;
  uuid: string;
  setUuid: Dispatch<SetStateAction<string>>;
  orderPayloadKey: boolean;
  setOrderPayloadKey: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={
        "flex px-2 md:justify-center md:flex-row flex-col gap-2 mb-4 pt-4"
      }
    >
      <Dropdown decode={decode} setDecode={setDecode}></Dropdown>
      <SettingButton
        buttonTitle={"uuid"}
        value={uuid}
        setValue={setUuid}
      ></SettingButton>
      <SettingButton
        buttonTitle={"sts"}
        value={sts}
        setValue={setSts}
      ></SettingButton>
      <JsonOrderToggleButton
        orderPayloadKey={orderPayloadKey}
        setOrderPayloadKey={setOrderPayloadKey}
      ></JsonOrderToggleButton>
    </div>
  );
}
