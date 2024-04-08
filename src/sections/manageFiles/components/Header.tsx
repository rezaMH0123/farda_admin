import React from "react";
import AdditionButton from "@/components/AdditionButton";
import plusIcon from "@/assets/img/tools/plus.svg";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";

export default function ManageFileHeaderSection({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="header flex justify-between items-center px-6 h-[15%]">
      <div className="right">
        <span className="text-[20px] font-ShabnamMedium font-semibold">
          {SHARED_STRINGS[StringsE.ManageFiles]}
        </span>
      </div>
      <div className="left flex justify-end items-center gap-x-5 w-[30%] h-full">
        <AdditionButton
          className="w-[152px] h-[44px] font-ShabnamMedium"
          onClick={() => setOpenModal(true)}
        >
          <span className="text-[14px]">
            {SHARED_STRINGS[StringsE.AdditionButton]}
          </span>
          <img src={plusIcon} alt="plusIcon" />
        </AdditionButton>
      </div>
    </div>
  );
}
