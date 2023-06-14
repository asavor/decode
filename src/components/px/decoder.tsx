"use client";

import InputTextArea from "@/components/px/inputTextArea";
import { ChangeEvent, useEffect, useState } from "react";
import SettingToolBar from "@/components/px/settingToolbar";
import deobfuscate from "../../module/px/js/encode";
import obfuscatePayload from "../../module/px/js/decode";
import OutputText from "@/components/px/outputText";
import { mode } from "@/components/px/constant/mode";

export default function Decoder() {
  const [decode, setDecode] = useState(1);
  const [uuid, setUuid] = useState("");
  const [sts, setSts] = useState("");
  const [finalPayload, setFinalPayload] = useState("");
  const [payload, setPayload] = useState("");

  const updateUuid = (props?: ChangeEvent<HTMLInputElement>, sent?: string) => {
    if (sent) {
      setUuid(() => sent);
    } else {
      setUuid(() => props!.target.value);
    }
  };

  const updateSts = (props?: ChangeEvent<HTMLInputElement>, sent?: string) => {
    if (sent) {
      setSts(() => sent);
    } else {
      setSts(() => props!.target.value);
    }
  };

  const updatePayload = (props: any) => {
    const InputPayload = props.target.value;
    if (mode) {
      if (InputPayload.includes("payload")) {
        try {
          const ParsedUuid = InputPayload.match(`uuid=(.*)&ft`);
          updateUuid(undefined, ParsedUuid[1]);
          const ParsedPayload = InputPayload.match(`payload=(.*)&appId`);
          setPayload(() => ParsedPayload[1]);
        } catch (error) {}
      } else {
        setPayload(() => InputPayload);
      }
    } else {
      try {
        const payload = InputPayload;

        setPayload(() => payload);
        const regex = /"PX10206":"(.*?)","/gm;
        let m;
        while (
          (m = regex.exec(JSON.stringify(JSON.parse(InputPayload)))) !== null
        ) {
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }

          m.forEach((match) => {
            if (match.length === 36) {
              updateUuid(undefined, match);
              return;
            }
          });
        }
      } catch (error) {
        updateFinalPayload("");
      }
    }
  };

  const updateFinalPayload = (value: string) => {
    setFinalPayload(() => value);
  };

  useEffect(() => {
    setPayload(() => "");
    setFinalPayload(() => "");
    setSts(() => "");
    setUuid(() => "");
  }, [decode]);

  useEffect(() => {
    if (decode) {
      try {
        if (payload == "") {
          updateFinalPayload("");
        }
        const value = JSON.parse(deobfuscate(payload, uuid, sts));
        const parse = JSON.stringify(value, null, 4);
        updateFinalPayload(parse);
      } catch (error) {
        updateFinalPayload(deobfuscate(payload, uuid, sts));
      }
    } else {
      try {
        updateFinalPayload(
          obfuscatePayload(JSON.stringify(JSON.parse(payload)), uuid, sts)
        );
      } catch (error) {
        if (payload == "") {
        } else {
          updateFinalPayload("Invalid Json");
        }
      }
    }
  }, [payload, uuid, sts]);

  return (
    <div className={"w-full grow h-full"}>
      <h1 className={"text-center text-2xl mb-4"}>
        PerimeterX Payload {decode ? "Decode" : "Encode"}
      </h1>
      <div className="bg-gradient-to-t from-darkCustomColour to-[#110d1e]  h-full rounded-md">
        <SettingToolBar
          setDecode={setDecode}
          decode={decode}
          sts={sts}
          setSts={setSts}
          uuid={uuid}
          setUuid={setUuid}
        ></SettingToolBar>
        <div
          className={"flex md:flex-row flex-col gap-6 pt-16 pb-2 px-4 h-full"}
        >
          <InputTextArea
            decode={decode}
            payload={payload}
            updatePayload={updatePayload}
          ></InputTextArea>
          <OutputText decode={decode} finalPayload={finalPayload}></OutputText>
        </div>
      </div>
    </div>
  );
}
