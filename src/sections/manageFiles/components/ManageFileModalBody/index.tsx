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
    <div>
      <p className="text-[20px] font-ShabnamBold mt-10 mr-10 text-PrimaryBlack-100">
        {SHARED_STRINGS[StringsE.AddFile]}
      </p>
      <form
        onClick={() =>
          document.querySelector<HTMLInputElement>(".input-field")?.click()
        }
      >
        <div
          style={{ backgroundImage: `url(${AploadBg})` }}
          className="w-[70%] h-[232px] flex flex-col justify-center items-center m-auto mt-8 cursor-pointer bg-contain bg-no-repeat"
        >
          <input
            type="file"
            className="input-field"
            hidden
            onChange={handleFileInputChange}
          />
          <p className="mt-[40%] font-ShabnamRegular">{file && file.name}</p>
        </div>
      </form>
      <div className="w-[70%] h-[44px] m-auto flex gap-5 mt-8">
        <Button
          className="text-sm w-[50%] h-full font-bold text-PrimaryRed-100 border border-PrimaryRed-100 leading-5"
          title={SHARED_STRINGS[StringsE.Close]}
          onClick={closeModal}
        />
        <Button
          type="submit"
          className="text-sm w-[50%] h-full font-bold text-[#FFFFFF] bg-PrimaryBlue-100 leading-5"
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
