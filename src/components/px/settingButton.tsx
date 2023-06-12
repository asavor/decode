import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function SettingButton({
  buttonTitle,
  value,
  setValue,
}: {
  buttonTitle: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex justify-start ">
      <label
        htmlFor={buttonTitle}
        className="mr-3 block text-lg font-medium text-white "
      >
        {buttonTitle}
      </label>
      <div className="relative  rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
        <input
          type="text"
          name={buttonTitle}
          className="block w-full rounded-md border-gray-300 bg-slate-900 py-1 px-1 text-white"
          placeholder={buttonTitle == "sts" ? "1651526936831" : "uuid"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
