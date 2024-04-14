import plusIcon from "@/assets/img/tools/plus.svg";
import filrterIcon from "@/assets/img/tools/filter.svg";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import { useModal } from "@/context/modalContext";
import Button from "@/components/Button";

const ContentHeaderSection = () => {
  const { openModal } = useModal();
  return (
    <div className="header flex justify-between items-center px-6 h-[15%] ">
      <div className="right">
        <span className="text-[20px] font-ShabnamMedium font-semibold">
          {SHARED_STRINGS[StringsE.Content]}
        </span>
      </div>
      <div className="left flex justify-end items-center gap-x-5  w-[30%] h-full">
        <div className="flex justify-center items-center cursor-pointer font-ShabnamMedium">
          <span className="text-PrimaryBlack-300">
            {SHARED_STRINGS[StringsE.Filter]}
          </span>
          <img src={filrterIcon} alt="filrterIcon" />
        </div>
        <Button
          onClick={openModal}
          title={SHARED_STRINGS[StringsE.AdditionButton]}
          className="w-[152px] font-medium"
          model="fill_blue"
          icon={<img src={plusIcon} alt="plusIcon" />}
        ></Button>
      </div>
    </div>
  );
};

export default ContentHeaderSection;
