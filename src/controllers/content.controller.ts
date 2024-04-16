import http from "@/core/services/httpServices";
import { HttpResponseList } from "@/types/httpResponse";
import { Advertisement } from "@/types/models/Content.type";

export const contentController = {
  getContent: async (currentPage: number) => {
    try {
      const res = await http.get<HttpResponseList<Advertisement>>(
        "Panel/Content",
        {
          params: {
            Size: 6,
            Page: currentPage,
            Sort: "createdOn",
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch content");
    }
  },
};
