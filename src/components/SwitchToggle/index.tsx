type SwitchToggleProps = {
  value: boolean;
  toggleBackground: string;
  toggleText: string;
  onChange: (value: boolean) => void;
};
export default function SwitchToggle({
  toggleBackground,
  toggleText,
  onChange,
  value,
}: SwitchToggleProps) {
  return (
    <div className="flex items-center gap-x-4">
      <span className="text-Black-B2 font-light">{toggleText}</span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
          id="switch"
          type="checkbox"
          className="peer sr-only"
        />
        <label htmlFor="switch" className="hidden"></label>
        <div
          style={
            value
              ? { backgroundColor: toggleBackground }
              : { backgroundColor: "" }
          }
          className={`peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-W1 after:transition-all 
          after:content-['']  peer-checked:after:translate-x-full  peer-checked:after:border-white peer-focus:ring-green-300`}
        ></div>
      </label>
    </div>
  );
}
