import CategoryForm from "@/components/Form/CategoryForm";
import Modal from "@/components/Modal";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import { Fragment } from "react";

type AddCategorieModalProps = {
  isModal: boolean;
  HandleCloseModal: () => void;
};

export default function AddCategorieModal({
  HandleCloseModal,
  isModal,
}: AddCategorieModalProps) {
  return (
    <Fragment>
      {isModal && (
        <Modal onCloseModal={HandleCloseModal} height={45} width={30}>
          <CategoryForm
            onCloseModal={HandleCloseModal}
            title={SHARED_STRINGS[StringsE.Add]}
            controller="post"
          />
        </Modal>
      )}
    </Fragment>
  );
}
