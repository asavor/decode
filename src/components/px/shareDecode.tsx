"use client";

import InputTextArea from "@/components/px/inputTextArea";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import SettingToolBar from "@/components/px/settingToolbar";
import deobfuscate from "../../module/px/js/encode";
import obfuscatePayload from "../../module/px/js/decode";
import OutputText from "@/components/px/outputText";
import { mode } from "@/components/px/constant/mode";
import { sharePayloadData } from "@/app/(navbar)/px/[id]/interface";

export default function ShareDecode({
  sharePayload = {
    payload: "",
    decode: true,
    created_at: 0,
    is_owner: false,
  },
}: {
  sharePayload?: sharePayloadData;
}) {
  const [decode, setDecode] = useState(sharePayload.decode);
  const [uuid, setUuid] = useState("");
  const [sts, setSts] = useState("");
  const [startPayload, setStartPayload] = useState(atob(sharePayload.payload));
  const [finalPayload, setFinalPayload] = useState("");
  const [payload, setPayload] = useState("");
  const [IsOwner, setIsOwner] = useState(sharePayload.is_owner);
  const [orderPayloadKey, setOrderPayloadKey] = useState(false);
  const [orderedFinalPayload, setOrderedFinalPayload] = useState("");

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

  useMemo(() => {
    if (mode) {
      if (startPayload.includes("payload")) {
        try {
          const ParsedUuid: RegExpMatchArray | null =
            startPayload.match(`uuid=(.*)&ft`);
          if (ParsedUuid) {
            updateUuid(undefined, ParsedUuid[1]);
          }
          const ParsedPayload: RegExpMatchArray | null =
            startPayload.match(`payload=(.*)&appId`);
          if (ParsedPayload) {
            setPayload(() => ParsedPayload[1]);
          }
        } catch (error) {}
      } else {
        setPayload(() => startPayload);
      }
    } else {
      try {
        const payload = startPayload;

        setPayload(() => payload);
        const regex = /"PX10206":"(.*?)","/gm;
        let m;
        while (
          (m = regex.exec(JSON.stringify(JSON.parse(startPayload)))) !== null
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
      } catch (error) {}
    }
  }, [startPayload]);

  const updateFinalPayload = (value: string) => {
    setFinalPayload(() => value);
  };

  useMemo(() => {
    if (decode) {
      try {
        if (payload == "") {
          updateFinalPayload("");
        }

        const decodedPayload = JSON.parse(deobfuscate(payload, uuid, sts));

        updateFinalPayload(JSON.stringify(decodedPayload, null, 4));

        for (let i = 0; i < Object.keys(decodedPayload).length; i++) {
          const orderedKey = Object.keys(decodedPayload[i]["d"])
            .sort()
            .reduce((obj, key) => {
              // @ts-ignore
              obj[key] = decodedPayload[i]["d"][key];
              return obj;
            }, {});
          decodedPayload[i]["d"] = orderedKey;
        }
        setOrderedFinalPayload(JSON.stringify(decodedPayload, null, 4));
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
    <div className={"w-full h-full relative"}>
      <h1 className={"text-center text-2xl mb-4"}>
        PerimeterX Payload {decode ? "Decode" : "Encode"}
      </h1>

      <div className="bg-gradient-to-t from-darkCustomColour to-[#110d1e] h-full rounded-md relative">
        <SettingToolBar
          setDecode={setDecode}
          decode={decode}
          sts={sts}
          setSts={setSts}
          uuid={uuid}
          setUuid={setUuid}
          orderPayloadKey={orderPayloadKey}
          setOrderPayloadKey={setOrderPayloadKey}
          startPayload={startPayload}
          shareMode={true}
          IsOwner={IsOwner}
        ></SettingToolBar>
        <div className={"flex md:flex-row flex-col gap-6 px-4 h-full pb-20"}>
          <InputTextArea
            decode={decode}
            payload={payload}
            disabled={true}
          ></InputTextArea>
          <OutputText
            orderPayloadKey={orderPayloadKey}
            decode={decode}
            finalPayload={orderPayloadKey ? orderedFinalPayload : finalPayload}
          ></OutputText>
        </div>
      </div>
    </div>
  );
}
