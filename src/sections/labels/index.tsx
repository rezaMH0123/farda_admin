import TagForm from "@/components/Form/TagForm";
import TextInput from "@/components/Inputs/TextInput";
import Modal from "@/components/Modal";
import TableWithApi from "@/components/TableWithApi";
import { labelController } from "@/controllers/label.controller";
import { HttpResponseList } from "@/types/httpResponse";
import { LabelI } from "@/types/models/Label.type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LabelHeaderSection from "./components/Header";
import RowLabel from "./components/RowLabel";

const chartTitles = ["عنوان", "پین بودن", "عملیات"];

export default function Labels() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);

  const { data, isLoading } = useQuery<HttpResponseList<LabelI>>({
    queryKey: ["labels", currentPage],
    queryFn: () => labelController.getLabel(currentPage),
    retry: false,
    refetchOnWindowFocus: true,
  });

  console.log(data);

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
        keyNme="content"
      >
        {(row) => (
          <RowLabel
            modal={modal}
            setModal={setModal}
            keyName="content"
            {...row}
          />
        )}
      </TableWithApi>

      {modal && (
        <Modal onCloseModal={HandleCloseModal} height={45} width={30}>
          <TagForm onCloseModal={HandleCloseModal} />
        </Modal>
      )}
    </div>
  );
}
