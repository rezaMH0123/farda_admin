import { Fragment, useEffect, useRef } from "react";

type FilterDropDownProps = {
  setFilterState: React.Dispatch<React.SetStateAction<number>>;
  option: string[] | boolean[] | null;
  onChange: (data: string | boolean) => void;
};

export default function FilterDropDown({
  setFilterState,
  option,
  onChange,
}: FilterDropDownProps) {
  const filterRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      filterRef.current &&
      !(filterRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setFilterState(0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Fragment>
      <div
        ref={filterRef}
        className="w-[100px] py-4 bg-white shadow-custom1 rounded-md p-2 flex flex-col items-center  absolute top-9 cursor-auto"
      >
        <div
          onClick={() => {
            onChange("");
          }}
          className=" w-full text-center mb-1 mt-1 py-2 rounded-md hover:bg-Blue-BlueHover hover:text-white"
        >
          <span className="cursor-pointer rounded-md">----</span>
        </div>
        {option?.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              onChange(item);
            }}
            className=" w-full text-center mb-1 mt-1 py-2 rounded-md hover:bg-Blue-BlueHover hover:text-white"
          >
            <span className="cursor-pointer rounded-md">
              {item === true
                ? "می شود"
                : item === false
                ? "نمی شود"
                : item === "Publish"
                ? "منتشر شده"
                : "منتشر نشده"}
            </span>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
