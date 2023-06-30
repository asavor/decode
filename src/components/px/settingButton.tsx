import { ChangeEvent, Dispatch, SetStateAction } from "react";

export default function SettingButton({
  buttonTitle,
  value,
  setValue,
  disabled,
}: {
  buttonTitle: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  disabled: boolean;
}) {
  return (
    <div className="flex justify-start">
      <label
        htmlFor={buttonTitle}
        className="mr-1 block text-lg font-medium text-white "
      >
        {buttonTitle}
      </label>
      <div className="rounded-md shadow-sm w-full">
        <input
          type="text"
          disabled={disabled}
          name={buttonTitle}
          className="block w-full rounded-md border-gray-300 bg-slate-900 py-1 px-1 text-white focus:outline-none focus:ring-indigo-500"
          placeholder={buttonTitle == "sts" ? "1651526936831" : "uuid"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
}
