import http from "@/core/services/httpServices";
import { HttpApiResponse, HttpResponseList } from "@/types/httpResponse";

import {
  CategorieItem,
  CategoryMain,
  CategoryPostT,
} from "@/types/models/Categories.type";

import { AxiosError } from "axios";
import SHARED_STRINGS from "@/constants/strings/shared.string";
import StringsE from "@/types/strings";
import { ErrorToast, SuccessToast } from "@/components/Toast";

export const CategorieController = {
  getCategorie: async () => {
    try {
      const res = await http.get<HttpApiResponse<CategorieItem[]>>(
        "Panel/Category/GetWithSubCategories"
      );
      return res.data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        ErrorToast(errorMessage);
      }
      throw new Error("Failed to fetch content");
    }
  },
  getMainCategory: async (Size: number, Page: number) => {
    try {
      const res = await http.get<HttpResponseList<CategoryMain>>(
        "Panel/Category",
        {
          params: {
            Size,
            Page,
            Sort: "createdOn desc",
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        ErrorToast(errorMessage);
      }
      throw new Error("Failed to fetch category");
    }
  },
  getChilds: async (parentId: string, Page: number) => {
    try {
      const res = await http.get<HttpResponseList<CategoryMain>>(
        "Panel/Category/GetChilds",
        {
          params: {
            parentId,
            Size: 6,
            Page,
            Sort: "createdOn desc",
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        ErrorToast(errorMessage);
      }
      throw new Error("Failed to fetch child of category");
    }
  },
  postCategory: async (data: CategoryPostT) => {
    try {
      const res = await http.post<HttpApiResponse>("Panel/Category", data);
      SuccessToast(SHARED_STRINGS[StringsE.AddedCategory]);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        ErrorToast(errorMessage);
      }
      throw new Error("Failed to post category");
    }
  },
  putCategory: async (data: CategoryMain) => {
    try {
      const res = await http.put<HttpApiResponse>("Panel/Category", data);
      SuccessToast(SHARED_STRINGS[StringsE.EditedCategory]);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        ErrorToast(errorMessage);
      }
      throw new Error("Failed to put category");
    }
  },
  deleteCategory: async (id: string) => {
    try {
      const res = await http.delete<HttpApiResponse>("Panel/Category", {
        params: {
          id,
        },
      });
      SuccessToast(SHARED_STRINGS[StringsE.DeletedCategory]);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data.message;
        ErrorToast(errorMessage);
      }
      throw new Error("Failed to delete category");
    }
  },
};
