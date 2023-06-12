import SettingButton from "@/components/px/settingButton";
import { Dropdown } from "@/components/px/dropdown";
import { Dispatch, SetStateAction } from "react";

export default function SettingToolBar({
  decode,
  setDecode,
  sts,
  setSts,
  uuid,
  setUuid,
}: {
  decode: number;
  setDecode: Dispatch<SetStateAction<number>>;
  sts: string;
  setSts: Dispatch<SetStateAction<string>>;
  uuid: string;
  setUuid: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className={"flex justify-center "}>
      <div className={"flex flex-row mt-4 absolute"}>
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
      </div>
    </div>
  );
}
