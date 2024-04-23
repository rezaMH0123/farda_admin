import fardaLogo from "@/assets/img/logo/Group 22.svg";
import dropDownicon from "@/assets/img/tools/arrow_down.svg";
import {
  getPersianDay,
  getPersianDayOfWeek,
  getPersianMonth,
  getPersianYear,
} from "@/utils/helper";

export default function Header() {
  return (
    <div className="flex justify-between bg-Back-Back1 w-full h-[80px] rounded-[14px] font-medium">
      <div className="flex items-center justify-between gap-x-4  min-w-[17%] ml-8">
        <img className="cursor-pointer" src={dropDownicon} alt="dropDownicon" />
        <span className="text-Black-B2">سبحان کاظمی </span>
        <div className="border border-Red-R2 rounded-full w-[45px] h-[45px]"></div>
      </div>
      <div className="flex items-center gap-x-8 mr-8 ">
        <div className="flex flex-row-reverse gap-x-1 text-Black-B2">
          <span>امروز</span>
          <span>{getPersianDayOfWeek()}</span>
          <span>{getPersianDay()}</span>
          <span>{getPersianMonth()}</span>
          <span>{getPersianYear()}</span>
        </div>
        <div className="img flex items-center h-full">
          <img className="h-full w-[150px]" src={fardaLogo} alt="fardaLogo" />
        </div>
      </div>
    </div>
  );
}
