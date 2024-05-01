import { ErrorToast, SuccessToast } from "@/components/Toast";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import http from "@/core/services/httpServices";
import { HttpApiResponse, HttpResponseList } from "@/types/httpResponse";
import { LabelI, TagI } from "@/types/models/Label.type";
import StringsE from "@/types/strings";
import { AxiosError } from "axios";

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
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        ErrorToast(errorMessage);
      }
      throw new Error("Failed to fetch label");
    }
  },
  postLabel: async (newLabel: TagI) => {
    try {
      const res = await http.post<HttpApiResponse>("Panel/Tag", newLabel);
      SuccessToast(SHARED_STRINGS[StringsE.AddedTag]);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        ErrorToast(errorMessage);
      }
      throw err;
    }
  },
  deleteTag: async (id: string) => {
    try {
      const res = await http.delete<HttpApiResponse>(`Panel/Tag/${id}`);
      SuccessToast(SHARED_STRINGS[StringsE.DeletedTag]);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        ErrorToast(errorMessage);
      }
      throw err;
    }
  },
  putLabel: async (oldLabel: LabelI) => {
    try {
      const res = await http.put<HttpApiResponse>("Panel/Tag", oldLabel);
      SuccessToast(SHARED_STRINGS[StringsE.EditedTag]);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        ErrorToast(errorMessage);
      }
      throw new Error("Failed to fetch label");
    }
  },
};
