"use client";
import { Dispatch, SetStateAction, useEffect } from "react";

import { Switch } from "@headlessui/react";

export default function JsonOrderToggleButton({
  orderPayloadKey,
  setOrderPayloadKey,
}: {
  orderPayloadKey: boolean;
  setOrderPayloadKey: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    localStorage.setItem("orderPayloadKey", orderPayloadKey.toString());
  }, [orderPayloadKey]);
  return (
    <div className={"flex"}>
      <p className={"text-white font-Exo font-semibold mt-1 mr-1"}>
        {"Order Keys"}
      </p>
      <div className={"  "}>
        <Switch
          checked={orderPayloadKey}
          onChange={setOrderPayloadKey}
          className={`border-[1px] border-indigo-400 relative inline-flex h-[32px] w-[116px] items-center rounded-[4px]`}
        >
          <span
            className={`${
              orderPayloadKey ? "translate-x-[-1px]" : "translate-x-[60px]"
            } inline-block h-[34px] w-[55px] transform transition relative bg-indigo-700 rounded-[4px]`}
          />
          <div
            className={"flex justify-between text-white w-full absolute px-4"}
          >
            <span className={orderPayloadKey ? "" : "text-gray-800"}>Yes</span>
            <span className={orderPayloadKey ? "text-gray-800" : ""}>No</span>
          </div>
        </Switch>
      </div>
    </div>
  );
}
