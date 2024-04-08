import { ChangeEvent, useState } from "react";
import AploadBg from "@/assets/img/tools/uploadBg.svg";
import Success from "@/assets/img/logo/success.svg";
import toast from "react-hot-toast";
import StringsE from "@/types/strings";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import Button from "@/components/Button";

export default function ManageFileModalBody({
  setOpenModal,
  photos,
  files,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  photos: File[];
  setPhotos: React.Dispatch<React.SetStateAction<File[]>>;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  const [file, setFile] = useState<File | undefined>();

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    setFile(image);
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
          type="submit"
          className="text-sm w-[50%] h-full font-ShabnamBold text-PrimaryRed-100 border border-Pritext-PrimaryRed-100 leading-5 disabled:bg-[#a2e5fd] disabled:cursor-not-allowed"
          title={SHARED_STRINGS[StringsE.Close]}
          onClick={() => setOpenModal(false)}
        />
        <Button
          type="submit"
          className="text-sm w-[50%] h-full font-ShabnamBold text-[#FFFFFF] bg-PrimaryBlue-100 leading-5 disabled:bg-[#a2e5fd] disabled:cursor-not-allowed"
          title={SHARED_STRINGS[StringsE.AddFile]}
          onClick={() => {
            if (file?.type.slice(0, 5) === "image") {
              photos.push(file);
              setOpenModal(false);
              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } h-[40px] w-[350px] bg-PrimaryGreen-100 rounded-lg flex items-center justify-end`}
                >
                  <p className="mr-2 font-ShabnamRegular text-[#000]">
                    .عکس با موفقیت اضافه شد
                  </p>
                  <img src={Success} className="mr-4" />
                </div>
              ));
            } else if (file?.type.slice(0, 11) === "application") {
              files.push(file);
              setOpenModal(false);
              toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } h-[40px] w-[350px] bg-PrimaryGreen-100 rounded-lg flex items-center justify-end`}
                >
                  <p className="mr-2 font-ShabnamRegular text-[#000]">
                    .فایل با موفقیت اضافه شد
                  </p>
                  <img src={Success} className="mr-4" />
                </div>
              ));
            }
          }}
        />
      </div>
    </div>
  );
}
