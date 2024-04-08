import AdditionButton from "@/components/AdditionButton";
import plusIcon from "@/assets/img/tools/plus.svg";
import filrterIcon from "@/assets/img/tools/filter.svg";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";

type ContentHeaderSectionProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContentHeaderSection = ({ setOpenModal }: ContentHeaderSectionProps) => {
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
        <AdditionButton
          onClick={() => setOpenModal(true)}
          className="w-[152px] h-[44px] font-ShabnamMedium "
        >
          <span className="text-[14px]">
            {SHARED_STRINGS[StringsE.AdditionButton]}
          </span>
          <img src={plusIcon} alt="plusIcon" />
        </AdditionButton>
      </div>
    </div>
  );
};

export default ContentHeaderSection;
