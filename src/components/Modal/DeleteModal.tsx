import IconDelete from "@/components/Icons/DeleteIcon";
import Button from "@/components/Button";
import { useModal } from "@/context/modalContext";
import Loading from "../Loading";

type Props = {
  title: string | undefined;
  onClick: () => Promise<void>;
  loading: boolean;
};

export default function DeleteModal({ title, onClick, loading }: Props) {
  const { closeDeleteModal } = useModal();

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex items-center flex-col">
        <IconDelete className="mt-[82px]" />
        <p className="mt-4 text-PrimaryBlack-800 text-xs">{title}</p>
        <div className="w-[70%] h-[44px] m-auto flex gap-5 mt-12">
          <Button
            className="text-sm w-[50%]"
            model="outline_gray"
            title="منصرف شدم"
            onClick={closeDeleteModal}
          />
          <Button
            className="text-sm w-[50%]"
            model="fill_red"
            title={
              loading ? (
                <Loading className={"bg-PrimaryBlack-200"} />
              ) : (
                "حذف شود"
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
