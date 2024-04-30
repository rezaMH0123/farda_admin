import http from "@/core/services/httpServices";
import { HttpApiResponse, HttpResponseList } from "@/types/httpResponse";
import { LabelI, TagI } from "@/types/models/Label.type";

export const labelController = {
  getLabel: async (Page: number) => {
    try {
      const res = await http.get<HttpResponseList<LabelI>>("Panel/Tag", {
        params: {
          Size: 6,
          Page,
          Sort: "createdOn desc",
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch label");
    }
  },
  postLabel: async (newLabel: TagI) => {
    console.log(newLabel);

    try {
      const res = await http.post<HttpApiResponse>("Panel/Tag", newLabel);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteTag: async (id: string) => {
    try {
      const res = await http.delete<HttpApiResponse>(`Panel/Tag/${id}`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  putLabel: async (oldLabel: LabelI) => {
    try {
      const res = await http.put<HttpApiResponse>("Panel/Tag", oldLabel);
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch label");
    }
  },
};
