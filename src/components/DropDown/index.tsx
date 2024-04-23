import Select, { StylesConfig } from "react-select";
export type OptionType = {
  value: string;
  label: string;
};
type SelectInputProps = {
  placeholder: string;
  options?: OptionType[];
  isMulti: boolean;
  setCategory: React.Dispatch<
    React.SetStateAction<string | string[] | undefined>
  >;
  setCategorys?: React.Dispatch<
    React.SetStateAction<string[] | string | undefined>
  >;
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
    paddingRight: "17px",
  }),
};

const MyDropDown = ({
  options,
  placeholder,
  setCategory,
  setCategorys,
  isMulti,
}: SelectInputProps) => {
  const handleChange = (newValue: unknown) => {
    if (newValue !== null && typeof newValue !== "undefined") {
      const selectedOption = newValue as OptionType;
      if (Array.isArray(selectedOption)) {
        const values = selectedOption.map((option) => option.value);
        setCategory(values);
        setCategorys && setCategorys(values);
      } else {
        setCategory(selectedOption.value);
        setCategorys && setCategorys(selectedOption.value);
      }
    } else {
      setCategory(undefined);
      setCategorys && setCategorys(undefined);
    }
  };

  return (
    <div className="w-[47%] h-[38px]">
      <Select
        options={options}
        noOptionsMessage={() => "یافت نشد"}
        styles={customStyles}
        placeholder={placeholder}
        onChange={handleChange}
        isMulti={isMulti}
        maxMenuHeight={105}
      />
    </div>
  );
};

export default MyDropDown;
