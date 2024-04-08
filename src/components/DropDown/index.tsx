import React from "react";
import Select, { StylesConfig } from "react-select";
type OptionType = {
  value: string;
  label: string;
};
type MyDropDownProps = {
  placeholder: string;
  options?: OptionType[];
};

const customStyles: StylesConfig = {
  // سلکت کننده تقسیم‌کننده را مخفی کنید
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#717C99",
    fontSize: "14px",
    paddingRight: "19px",
  }),
  control: (provided) => ({
    ...provided!,
    borderRadius: "8px",
    borderColor: "#B3B3B3",
  }),
  placeholder: (provided) => ({
    ...provided!,
    paddingRight: "17px",
    color: "#B3B3B3",
  }),
  input: (provided) => ({
    ...provided,
    paddingRight: "17px", // Add padding to the input
  }),
};

const MyDropDown: React.FC<MyDropDownProps> = ({ placeholder, options }) => {
  return (
    <div className="w-[47%] h-[38px]">
      <Select
        options={options}
        styles={customStyles}
        placeholder={placeholder}
        noOptionsMessage={() => "یافت نشد"}
      />
    </div>
  );
};

export default MyDropDown;
