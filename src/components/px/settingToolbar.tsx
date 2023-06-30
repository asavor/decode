import SettingButton from "@/components/px/settingButton";
import { Dropdown } from "@/components/px/dropdown";
import { Dispatch, SetStateAction } from "react";
import JsonOrderToggleButton from "@/components/px/jsonOrderToggleButton";
import ShareButton from "@/components/px/shareButton";
import DeleteButton from "@/components/px/deleteButton";

export default function SettingToolBar({
  decode,
  setDecode,
  sts,
  setSts,
  uuid,
  setUuid,
  orderPayloadKey,
  setOrderPayloadKey,
  startPayload,
  shareMode,
  IsOwner,
}: {
  decode: boolean;
  setDecode: Dispatch<SetStateAction<boolean>>;
  sts: string;
  setSts: Dispatch<SetStateAction<string>>;
  uuid: string;
  setUuid: Dispatch<SetStateAction<string>>;
  orderPayloadKey: boolean;
  setOrderPayloadKey: Dispatch<SetStateAction<boolean>>;
  startPayload: string;
  shareMode: boolean;
  IsOwner?: boolean;
}) {
  return (
    <div className="flex justify-between items-center px-2 gap-2 mb-4 pt-4">
      <div className="flex justify-center flex-grow">
        <Dropdown decode={decode} setDecode={setDecode} disabled={shareMode} />
        <SettingButton
          buttonTitle={"uuid"}
          value={uuid}
          setValue={setUuid}
          disabled={shareMode}
        />
        <SettingButton
          buttonTitle={"sts"}
          value={sts}
          setValue={setSts}
          disabled={shareMode}
        />
        <JsonOrderToggleButton
          orderPayloadKey={orderPayloadKey}
          setOrderPayloadKey={setOrderPayloadKey}
        />
      </div>
      <div className={"flex space-x-2"}>
        {shareMode ? (
          IsOwner ? (
            <DeleteButton />
          ) : null
        ) : (
          <ShareButton decode={decode} payload={startPayload} />
        )}
      </div>
    </div>
  );
}
