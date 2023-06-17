import { Dispatch, SetStateAction } from "react";

import { Switch } from "@headlessui/react";

export default function JsonOrderToggleButton({
  orderPayloadKey,
  setOrderPayloadKey,
}: {
  orderPayloadKey: boolean;
  setOrderPayloadKey: Dispatch<SetStateAction<boolean>>;
}) {
  const toggleButton = () => {
    setOrderPayloadKey(!orderPayloadKey);
  };
  return (
    <div>
      <p className={"text-white font-Exo font-semibold"}>{orderPayloadKey}</p>
      <div className={"  "}>
        <Switch
          checked={orderPayloadKey}
          onChange={setOrderPayloadKey}
          className={`border-[1px] border-[#2a73ed] relative inline-flex h-[40px] w-[116px] items-center rounded-[4px]`}
        >
          <span
            className={`${
              orderPayloadKey ? "translate-x-[3px]" : "translate-x-[57px]"
            } inline-block h-[34px] w-[55px] transform transition relative bg-circleColor rounded-[4px]`}
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
