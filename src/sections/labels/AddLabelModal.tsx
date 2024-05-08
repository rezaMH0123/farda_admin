import TagForm from "@/components/Form/TagForm";
import Modal from "@/components/Modal";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import { Fragment } from "react/jsx-runtime";

type AddLabelModalProps = {
  isModal: boolean;
  HandleCloseModal: () => void;
};

export default function AddLabelModal({
  HandleCloseModal,
  isModal,
}: AddLabelModalProps) {
  return (
    <Fragment>
      {isModal && (
        <Modal onCloseModal={HandleCloseModal} height={45} width={30}>
          <TagForm
            onCloseModal={HandleCloseModal}
            title={SHARED_STRINGS[StringsE.Add]}
            controller="post"
          />
        </Modal>
      )}
    </Fragment>
  );
}
