import http from "@/core/services/httpServices";
import { FilesI } from "@/types/models/Files.type";
import Cookies from "js-cookie";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { useModal } from "./modalContext";
import toast from "react-hot-toast";
import CustomToast from "@/components/Toast";

interface GlobalStateContextType {
  itemFile: FilesI | undefined;
  setItemFile: React.Dispatch<React.SetStateAction<FilesI | undefined>>;
  loading: boolean;
  deleteFiles: (id: string) => Promise<void>;
  fileStatus: "added" | "deleted" | "normal";
  setFileStatus: React.Dispatch<
    React.SetStateAction<"added" | "deleted" | "normal">
  >;
}

type MyComponentProps = {
  children: ReactNode;
};

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(
  undefined
);

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

const access_token: string | undefined = Cookies.get("access_token");

export const GlobalStateProvider: React.FC<MyComponentProps> = ({
  children,
}) => {
  const [itemFile, setItemFile] = useState<FilesI | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileStatus, setFileStatus] = useState<"added" | "deleted" | "normal">(
    "normal"
  );

  const { closeDeleteModal } = useModal();

  const deleteFiles = async (id: string | undefined) => {
    setLoading(true);

    await http
      .delete("Panel/File", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log(response);
        closeDeleteModal();
        setFileStatus("deleted");
        toast.custom((t) => (
          <CustomToast
            text="!فایل با موفقیت حذف شد"
            animation={t}
            status="success"
          />
        ));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <GlobalStateContext.Provider
      value={{
        itemFile,
        setItemFile,
        loading,
        deleteFiles,
        fileStatus,
        setFileStatus,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
