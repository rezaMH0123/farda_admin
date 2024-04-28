import plusIcon from "@/assets/img/tools/plus.svg";
import filrterIcon from "@/assets/img/tools/filter.svg";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import Button from "@/components/Button";

type LabelHeaderSectionProps = {
  title: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const LabelHeaderSection = ({ title, setModal }: LabelHeaderSectionProps) => {
  const HandleOpenModal = () => {
    setModal(true);
  };

  return (
    <div className="header flex justify-between items-center px-6 h-[15%]">
      <div className="right">
        <span className="text-[20px] font-bold text-Black-PrimaryBlack">
          {title}
        </span>
      </div>
      <div className="left flex justify-end items-center gap-x-5  w-[30%] h-full">
        <div className="flex justify-center items-center cursor-pointer font-medium">
          <span className="text-Black-B4">
            {SHARED_STRINGS[StringsE.Filter]}
          </span>
          <img src={filrterIcon} alt="filrterIcon" />
        </div>
        <Button
          title={SHARED_STRINGS[StringsE.AdditionButton]}
          className="w-[152px] font-medium"
          model="fill_blue"
          icon={<img src={plusIcon} alt="plusIcon" />}
          onClick={HandleOpenModal}
        />
      </div>
    </div>
  );
};

export default LabelHeaderSection;
