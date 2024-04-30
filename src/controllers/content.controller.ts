import http from "@/core/services/httpServices";
import { HttpApiResponse, HttpResponseList } from "@/types/httpResponse";
import { Advertisement, postContentT } from "@/types/models/Content.type";

export const contentController = {
  getContent: async (currentPage: number) => {
    try {
      const res = await http.get<HttpResponseList<Advertisement>>(
        "Panel/Content",
        {
          params: {
            Size: 6,
            Page: currentPage,
            Sort: "createdOn desc",
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch content");
    }
  },

  deleteContent: async (contentId: string) => {
    try {
      const res = await http.delete<HttpApiResponse>(
        `Panel/Content/${contentId}`
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch content");
    }
  },

  postContent: async (data: postContentT) => {
    try {
      const res = await http.post<HttpApiResponse>("Panel/Content", data);
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to post content");
    }
  },
};
