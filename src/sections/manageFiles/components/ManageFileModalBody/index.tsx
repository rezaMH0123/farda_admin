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

export default function ManageFileModalBody() {
  const [file, setFile] = useState<File | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const { closeModal } = useModal();

  const access_token: string | undefined = Cookies.get("access_token");

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userFile = e.target.files?.[0];
    setFile(userFile);
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
            <CustomToast text="error!" animation={t} status="error" />
          ));
        });
    }
  };

  return (
    <div className="h-full flex flex-col gap-y-4 p-5">
      <p className="text-[20px] font-bold mt-4 mr-10 text-PrimaryBlack-100">
        {SHARED_STRINGS[StringsE.AddFile]}
      </p>
      <form
        onClick={() =>
          document.querySelector<HTMLInputElement>(".input-field")?.click()
        }
      >
        <div
          style={{ backgroundImage: `url(${AploadBg})` }}
          className="w-[70%] h-[232px] flex flex-col justify-center items-center m-auto cursor-pointer bg-contain bg-no-repeat"
        >
          <input
            type="file"
            className="input-field"
            hidden
            onChange={handleFileInputChange}
          />
          <p className="mt-[40%] font-normal">{file && file.name}</p>
        </div>
      </form>
      <div className="w-[70%] m-auto flex gap-5 mt-7">
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
