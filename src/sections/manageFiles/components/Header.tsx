import plusIcon from "@/assets/img/tools/plus.svg";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import { useModal } from "@/context/modalContext";
import Button from "@/components/Button";

export default function ManageFileHeaderSection() {
  const { openUploadFileModal } = useModal();

  return (
    <div className="header flex justify-between items-center px-6 h-[15%]">
      <div className="right">
        <span className="text-[20px] font-ShabnamMedium font-semibold">
          {SHARED_STRINGS[StringsE.ManageFiles]}
        </span>
      </div>
      <div className="left flex justify-end items-center gap-x-5 w-[30%] h-full">
        <Button
          title={SHARED_STRINGS[StringsE.AdditionButton]}
          className="w-[152px] font-medium"
          model="fill_blue"
          onClick={openUploadFileModal}
          icon={<img src={plusIcon} alt="plusIcon" />}
        />
      </div>
    </div>
  );
}
