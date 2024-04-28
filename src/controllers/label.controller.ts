import http from "@/core/services/httpServices";
import { HttpResponseList } from "@/types/httpResponse";
import { LabelI } from "@/types/models/Label.type";

export const labelController = {
  getLabel: async (Page: number) => {
    try {
      const res = await http.get<HttpResponseList<LabelI>>("Panel/Tag", {
        params: {
          Size: 5000,
          Page,
          Sort: "createdOn",
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch content");
    }
  },
};
