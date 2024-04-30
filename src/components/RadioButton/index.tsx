import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";

type RadioButtonProps = {
  color?: string;
  value: string;
  onChange: (value: string) => void;
};

export default function RadioButton({
  color,
  value,
  onChange,
}: RadioButtonProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <label
        htmlFor="previewRadio"
        className={`flex items-center gap-x-3 text-Black-B3 cursor-pointer`}
      >
        {SHARED_STRINGS[StringsE.Previw]}
        <input
          id="previewRadio"
          type="radio"
          value="preview"
          checked={value === "preview"}
          onChange={handleChange}
          className={`hidden`}
        />
        <span
          style={{ border: `1px solid ${color}` }}
          className={`rounded-full w-5 h-5 flex justify-center items-center`}
        >
          {value === "preview" && (
            <span
              style={{ backgroundColor: `${color}` }}
              className={`w-3 h-3 rounded-full`}
            ></span>
          )}
        </span>
      </label>

      <label
        htmlFor="publishRadio"
        className={`flex items-center gap-x-3 text-Black-B3 cursor-pointer`}
      >
        {SHARED_STRINGS[StringsE.Realease]}
        <input
          id="publishRadio"
          type="radio"
          value="publish"
          checked={value === "publish"}
          onChange={handleChange}
          className={`hidden`}
        />
        <span
          style={{ border: `1px solid ${color}` }}
          className={`rounded-full w-5 h-5 flex justify-center items-center`}
        >
          {value === "publish" && (
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
