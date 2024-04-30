import Select, { StylesConfig } from "react-select";
export type OptionType = {
  value: string;
  label: string;
};
type SelectInputProps = {
  placeholder: string;
  options?: OptionType[];
  isMulti: boolean;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
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
  value,
  isMulti,
  onChange,
}: SelectInputProps) => {
  const valueObj = isMulti
    ? value
      ? (value as string[]).map((item) => {
          return options?.find((o) => o.value === item) || [];
        })
      : []
    : options?.find((item) => item.value === value);
  return (
    <div className="w-[47%] h-[38px]">
      <Select
        options={options}
        onChange={(data) => {
          if (isMulti) {
            onChange((data as OptionType[]).map((item) => item.value));
          } else {
            onChange((data as OptionType).value);
          }
        }}
        value={valueObj}
        noOptionsMessage={() => "یافت نشد"}
        styles={customStyles}
        placeholder={placeholder}
        isMulti={isMulti}
        maxMenuHeight={105}
      />
    </div>
  );
};

export default MyDropDown;
