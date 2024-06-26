import React from "react";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import { FieldError } from "react-hook-form";

type LabelItem = {
  name: string;
  value: string;
};
type LabelSelectedProps = {
  items: LabelItem[] | undefined;
  value: string[];
  onChange: (selectedValues: string[]) => void;
  error: FieldError;
};

const LabelSelected: React.FC<LabelSelectedProps> = ({
  items,
  value,
  onChange,
  error,
}) => {
  const handleCheckboxChange = (selectedValue: string) => {
    const updatedValue = value.includes(selectedValue)
      ? value.filter((val) => val !== selectedValue)
      : [...value, selectedValue];

    onChange(updatedValue);
  };

  return (
    <div>
      <div className="flex items-center">
        <span>{SHARED_STRINGS[StringsE.Tags] + "*"}</span>
        <div className="flex flex-wrap gap-y-4 gap-x-5 mr-8">
          {items?.map((item, index) => (
            <label key={index} className="flex items-center gap-x-2">
              <input
                type="checkbox"
                value={item.value}
                checked={value.includes(item.value)}
                onChange={() => handleCheckboxChange(item.value)}
                className="form-checkbox rounded border-gray-300 focus:ring-0 hidden"
              />
              <span
                className={`${
                  value.includes(item.value)
                    ? "text-W1 bg-Blue-PrimaryBlue border border-Blue-PrimaryBlue"
                    : "bg-Back-Back1 border border-Back-Back1"
                } py-1 px-3 rounded-2xl cursor-pointer text-Black-B2`}
              >
                {item.name}
              </span>
            </label>
          ))}
        </div>
      </div>
      {error?.message && (error.type === "required" || error.type == "min") && (
        <span className="text-Red-R2 text-xs font-normal leading-5">
          {error?.message.toString()}
        </span>
      )}
    </div>
  );
};

export default LabelSelected;
