type SwitchToggleProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  toggleBackground: string;
  toggleText: string;
};
export default function SwitchToggle({
  isActive,
  setIsActive,
  toggleBackground,
  toggleText,
}: SwitchToggleProps) {
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex items-center gap-x-4">
      <span className="text-PrimaryBlack-600 font-light">{toggleText}</span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          checked={isActive}
          onChange={handleToggle}
          id="switch"
          type="checkbox"
          className="peer sr-only"
        />
        <label htmlFor="switch" className="hidden"></label>
        <div
          style={
            isActive
              ? { backgroundColor: toggleBackground }
              : { backgroundColor: "" }
          }
          className={`peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all 
          after:content-['']  peer-checked:after:translate-x-full  peer-checked:after:border-white peer-focus:ring-green-300`}
        ></div>
      </label>
    </div>
  );
}
