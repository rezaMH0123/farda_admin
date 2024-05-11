import { FilesI } from "@/types/models/Files.type";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface GlobalStateContextType {
  itemFile: FilesI | undefined;
  setItemFile: React.Dispatch<React.SetStateAction<FilesI | undefined>>;
  tab: "photo" | "file";
  setTab: React.Dispatch<React.SetStateAction<"photo" | "file">>;
  queryKey: "files" | "images";
  setQueryKey: React.Dispatch<React.SetStateAction<"files" | "images">>;
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

export const GlobalStateProvider: React.FC<MyComponentProps> = ({
  children,
}) => {
  const [itemFile, setItemFile] = useState<FilesI | undefined>(undefined);
  const [tab, setTab] = useState<"photo" | "file">("photo");
  const [queryKey, setQueryKey] = useState<"files" | "images">("images");

  return (
    <GlobalStateContext.Provider
      value={{
        itemFile,
        setItemFile,
        tab,
        setTab,
        queryKey,
        setQueryKey,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
