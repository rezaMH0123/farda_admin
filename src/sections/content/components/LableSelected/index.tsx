import React from "react";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";

type LabelItem = {
  name: string;
  value: string;
};
type LabelSelectedProps = {
  items: LabelItem[] | undefined;
  value: string[];
  onChange: (selectedValues: string[]) => void;
};

const LabelSelected: React.FC<LabelSelectedProps> = ({
  items,
  value,
  onChange,
}) => {
  const handleCheckboxChange = (selectedValue: string) => {
    const updatedValue = value.includes(selectedValue)
      ? value.filter((val) => val !== selectedValue)
      : [...value, selectedValue];

    onChange(updatedValue);
  };

  return (
    <div className="flex items-center">
      <span>{SHARED_STRINGS[StringsE.Tags]}</span>
      <div className="flex flex-wrap gap-y-4 gap-x-5 mr-8">
        {items?.map((item, index) => (
          <label key={index} className="flex items-center gap-x-2">
            <input
              type="checkbox"
              value={item.value}
              checked={value.includes(item.value)}
              onChange={() => handleCheckboxChange(item.value)}
              className="form-checkbox rounded border-gray-300 focus:ring-0"
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
  );
};

export default LabelSelected;
