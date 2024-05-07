import "animate.css";
import { HttpApiResponse } from "@/types/httpResponse";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import ContentForm from "@/components/Form/ContentForm";
import LoadingContent from "../components/LoadingContent";
import { useNavigate, useParams } from "react-router-dom";
import { SingleContentI } from "@/types/models/Content.type";
import { contentController } from "@/controllers/content.controller";
import UploadFileModal from "../components/UploadFileModal";
import ChooseFileModal from "../components/ChooseFileModal";

export default function AddAndEditSection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMainImage, setSelectedMainImage] = useState<string>();
  const [selectedsecondImages, setSelectedsecondImages] = useState<string[]>(
    []
  );

  const {
    data: singleContent,
    isError,
    isLoading: singleContentLoading,
  } = useQuery<HttpApiResponse<SingleContentI>>({
    queryKey: ["singleContent", id],
    queryFn: () => contentController.getContentWithId(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

  if (isError && id) {
    navigate("/content");
  }

  if (singleContentLoading && id) {
    return <LoadingContent show={true} />;
  }

  return (
    <div
      dir="rtl"
      className="border border-Black-B5 w-[80%] h-[85%] rounded-[14px] bg-W1"
    >
      <ContentForm
        selectedMainImage={selectedMainImage}
        selectedsecondImages={selectedsecondImages}
        singleContent={id ? singleContent : undefined}
      />

      <ChooseFileModal
        setSelectedMainImage={setSelectedMainImage}
        setSelectedsecondImages={setSelectedsecondImages}
        selectedMainImage={selectedMainImage}
        selectedsecondImages={selectedsecondImages}
      />

      <UploadFileModal />
    </div>
  );
}
