import IconDelete from "@/components/Icons/DeleteIcon";
import Button from "@/components/Button";
import { useModal } from "@/context/modalContext";
import Loading from "../Loading";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";

type Props = {
  title: string | undefined;
  onClick: () => Promise<void> | void;
  loading?: boolean;
};

export default function DeleteModal({ title, onClick, loading }: Props) {
  const { closeDeleteModal } = useModal();

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex items-center flex-col">
        <IconDelete className="mt-[82px]" />
        <p className="mt-4 text-Black-B4 text-xs">{title}</p>
        <div className="w-[70%] h-[44px] m-auto flex gap-5 mt-12">
          <Button
            className="text-sm w-[50%]"
            model="outline_gray"
            title={SHARED_STRINGS[StringsE.Cancel]}
            onClick={closeDeleteModal}
          />
          <Button
            className="text-sm w-[50%]"
            model="fill_red"
            title={
              loading ? (
                <Loading className={"bg-Black-B2"} />
              ) : (
                SHARED_STRINGS[StringsE.Delete]
              )
            }
            onClick={onClick}
            disable={loading ? true : false}
          />
        </div>
      </div>
    </div>
  );
}
