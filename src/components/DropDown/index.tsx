import { FieldError } from "react-hook-form";
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
  error?: FieldError | undefined;
  width: number;
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
  error,
  width,
}: SelectInputProps) => {
  isMulti && console.log(value);
  const valueObj = isMulti
    ? value
      ? (value as string[])
          .map((item) => {
            return options?.find((o) => o.value === item) || "";
          })
          .filter((val) => val !== "")
      : []
    : options?.find((item) => item.value === value);

  return (
    <div className="h-[38px]" style={{ width: `${width}%` }}>
      <div className="w-full h-full">
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
      {error?.message && (error.type === "required" || error.type == "min") && (
        <span className="text-Red-R2 text-xs font-normal leading-5">
          {error?.message.toString()}
        </span>
      )}
    </div>
  );
};

export default MyDropDown;
