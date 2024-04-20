import http from "@/core/services/httpServices";
import { HttpApiResponse, HttpResponseList } from "@/types/httpResponse";
import { FilesI } from "@/types/models/Files.type";

export const fileController = {
  getFiles: async (currentPage: number) => {
    try {
      const res = await http.get<HttpResponseList<FilesI>>("Panel/File", {
        params: {
          Size: 6,
          Page: currentPage,
          Sort: "createdOn desc",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch files");
    }
  },
  postFiles: async (newFile: FormData) => {
    console.log(newFile);
    try {
      const res = await http.post<HttpApiResponse>("Panel/File", newFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteFiles: async (id: string) => {
    try {
      const res = await http.delete("Panel/File", {
        params: {
          id,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
