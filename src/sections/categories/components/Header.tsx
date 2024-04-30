import plusIcon from "@/assets/img/tools/plus.svg";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

type LabelHeaderSectionProps = {
  title: string | undefined;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PagesHeaderSection = ({ title, setModal }: LabelHeaderSectionProps) => {
  const HandleOpenModal = () => {
    setModal(true);
  };

  const router = useNavigate();

  return (
    <div className="header flex justify-between items-center px-6 h-[15%]">
      <div className="right">
        <span className="text-[20px] font-bold text-Black-PrimaryBlack">
          {title}
        </span>
      </div>
      <div className="left flex justify-end items-center gap-x-5  w-[30%] h-full">
        <Button
          model="outline_red"
          title="بازگشت"
          className="w-[152px] font-medium"
          onClick={() => router(-1)}
        />
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

export default PagesHeaderSection;
