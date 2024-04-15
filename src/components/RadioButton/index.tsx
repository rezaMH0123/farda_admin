import React from "react";

type RadioButtonProps = {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  color?: string;
};

export default function RadioButton({
  selectedOption,
  setSelectedOption,
  color,
}: RadioButtonProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <label
        htmlFor="previewRadio"
        className={`flex items-center gap-x-3 text-PrimaryBlack-700 cursor-pointer`}
      >
        پیش نمایش
        <input
          id="previewRadio"
          type="radio"
          value="preview"
          checked={selectedOption === "preview"}
          onChange={handleChange}
          className={`hidden`}
        />
        <span
          style={{ border: `1px solid ${color}` }}
          className={`rounded-full w-5 h-5 flex justify-center items-center`}
        >
          {selectedOption === "preview" && (
            <span
              style={{ backgroundColor: `${color}` }}
              className={`w-3 h-3 rounded-full`}
            ></span>
          )}
        </span>
      </label>

      <label
        htmlFor="publishRadio"
        className={`flex items-center gap-x-3 text-PrimaryBlack-700 cursor-pointer`}
      >
        انتشار
        <input
          id="publishRadio"
          type="radio"
          value="publish"
          checked={selectedOption === "publish"}
          onChange={handleChange}
          className={`hidden`}
        />
        <span
          style={{ border: `1px solid ${color}` }}
          className={`rounded-full w-5 h-5 flex justify-center items-center`}
        >
          {selectedOption === "publish" && (
            <span
              style={{ backgroundColor: `${color}` }}
              className={`w-3 h-3 rounded-full`}
            ></span>
          )}
        </span>
      </label>
    </>
  );
}
