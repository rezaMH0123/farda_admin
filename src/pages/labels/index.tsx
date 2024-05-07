import TableWithApi from "@/components/TableWithApi";
import { labelController } from "@/controllers/label.controller";
import { LabelI } from "@/types/models/Label.type";
import { useState } from "react";
import LabelHeaderSection from "../../sections/labels/components/Header";
import RowLabel from "../../sections/labels/components/RowLabel";
import AddLabelModal from "@/sections/labels/components/AddLabelModal";

const chartTitles = ["عنوان", "پین بودن", "عملیات"];

export default function Labels() {
  const [modal, setModal] = useState<boolean>(false);

  const HandleCloseModal = () => {
    setModal(false);
  };

  return (
    <div
      dir="rtl"
      className="border border-Black-B5 w-[80%] h-[85%] rounded-[14px] bg-W1"
    >
      <LabelHeaderSection setModal={setModal} title="تگ‌ها" />
      <TableWithApi<LabelI>
        controller={labelController.getLabel}
        title={chartTitles}
        keyNme="tags"
      >
        {(row) => (
          <RowLabel modal={modal} setModal={setModal} keyName="tags" {...row} />
        )}
      </TableWithApi>
      <AddLabelModal isModal={modal} HandleCloseModal={HandleCloseModal} />
    </div>
  );
}
