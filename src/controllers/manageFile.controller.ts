import http from "@/core/services/httpServices";
import { HttpResponseList } from "@/types/httpResponse";
import { FilesI } from "@/types/models/Files.type";

export const manageFileController = {
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
};
