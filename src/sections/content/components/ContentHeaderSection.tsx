import plusIcon from "@/assets/img/tools/plus.svg";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import Button from "@/components/Button";
import { Link } from "react-router-dom";

type ContentHeaderSectionProps = {
  title: string;
};

const ContentHeaderSection = ({ title }: ContentHeaderSectionProps) => {
  return (
    <div className="header flex justify-between items-center px-6 h-[15%]">
      <div className="right">
        <span className="text-[20px] font-bold text-Black-PrimaryBlack">
          {title}
        </span>
      </div>
      <div className="left flex justify-end items-center gap-x-5  w-[30%] h-full">
        <Link to={"add"}>
          <Button
            title={SHARED_STRINGS[StringsE.AdditionButton]}
            className="w-[152px] font-medium"
            model="fill_blue"
            icon={<img src={plusIcon} alt="plusIcon" />}
          ></Button>
        </Link>
      </div>
    </div>
  );
};

export default ContentHeaderSection;
