import http from "@/core/services/httpServices";
import { HttpResponseList } from "@/types/httpResponse";
import { TagsI } from "@/types/models/Tags.type";

export const TagsController = {
  getTags: async () => {
    try {
      const res = await http.get<HttpResponseList<TagsI>>(
        "Panel/Tag?Size=100000&Page=1&Sort=id"
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch content");
    }
  },
};
