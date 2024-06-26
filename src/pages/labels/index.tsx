import TableWithApi from "@/components/TableWithApi";
import { labelController } from "@/controllers/label.controller";
import { LabelI } from "@/types/models/Label.type";
import { useState } from "react";
import LabelHeaderSection from "../../sections/labels/Header";
import RowLabel from "../../sections/labels/RowLabel";
import AddLabelModal from "@/sections/labels/AddLabelModal";

const chartTitles = [
  {
    title: "عنوان",
    value: null,
  },
  {
    title: "پین بودن",
    value: [true, false],
  },
  {
    title: "عملیات",
    value: null,
  },
];

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
