import { ChangeEvent, useState } from "react";
import AploadBg from "@/assets/img/tools/uploadBg.svg";
import toast from "react-hot-toast";
import StringsE from "@/types/strings";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import Button from "@/components/Button";
import CustomToast from "@/components/Toast";
import http from "@/core/services/httpServices";
import Cookies from "js-cookie";
import Loading from "@/components/Loading";
import { useModal } from "@/context/modalContext";
import { useGlobalState } from "@/context/globalStateContext";

export default function ManageFileModalBody() {
  const [file, setFile] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const { closeModal } = useModal();

  const access_token: string | undefined = Cookies.get("access_token");

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userFile = e.target.files?.[0];
    if (userFile) {
      if (userFile.type === "image/svg+xml") {
        toast.custom((t) => (
          <CustomToast
            animation={t}
            status="error"
            text=".نوع فایل مجاز نمی‌باشد"
          />
        ));
      } else {
        setFile(userFile);
      }
    }
  };

  const addFile = async () => {
    setLoading(true);
    if (file === undefined) {
      setLoading(false);
      toast.custom((t) => (
        <CustomToast
          text="!لطفا فایل مورد نظر را انتخاب نمایید"
          animation={t}
          status="error"
        />
      ));
    } else {
      const formData = new FormData();
      formData.append("file", file);
      await http
        .post("Panel/File", formData, {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          closeModal();
          setLoading(false);
          toast.custom((t) => (
            <CustomToast
              text="!فایل با موفقیت اضافه شد"
              animation={t}
              status="success"
            />
          ));
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.custom((t) => (
            <CustomToast
              text="!مشکلی پیش آمده است"
              animation={t}
              status="error"
            />
          ));
        });
    }
  };

  return (
    <div className="h-[90%] w-full flex flex-col gap-y-2 p-5">
      <div className="h-fit">
        <p className="text-[20px] font-bold mr-10 text-PrimaryBlack-100">
          {SHARED_STRINGS[StringsE.AddFile]}
        </p>
      </div>
      <div className="h-[70%] relative mt-4">
        <div className="h-full flex flex-col items-center">
          <img
            src={AploadBg}
            alt="AploadBg"
            onClick={() =>
              document.querySelector<HTMLInputElement>(".input-field")?.click()
            }
            className="h-[85%] w-full cursor-pointer"
          />
          <input
            type="file"
            className="input-field"
            hidden
            onChange={handleFileInputChange}
          />
          <p className="mt-2 font-normal absolute bottom-0">
            {file && file.name.length > 30
              ? file.name.substring(0, 30) + "... ." + file.name.split(".")[1]
              : file?.name}
          </p>
        </div>
      </div>
      <div className="h-[25%] w-[70%] mt-2 flex m-auto gap-5">
        <Button
          className="text-sm w-[50%] font-bold"
          title={SHARED_STRINGS[StringsE.Close]}
          onClick={closeModal}
          model="outline_red"
        />
        <Button
          type="submit"
          className="text-sm w-[50%] font-bold"
          model="fill_blue"
          title={
            loading ? (
              <Loading className={"bg-PrimaryBlack-200"} />
            ) : (
              SHARED_STRINGS[StringsE.AddFile]
            )
          }
          onClick={addFile}
        />
      </div>
    </div>
  );
}
