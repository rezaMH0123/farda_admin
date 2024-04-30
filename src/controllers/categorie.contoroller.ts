import http from "@/core/services/httpServices";
import { HttpApiResponse, HttpResponseList } from "@/types/httpResponse";
import { CategorieItem, CategoryMain } from "@/types/models/Categories.type";

export const CategorieController = {
  getCategorie: async () => {
    try {
      const res = await http.get<HttpApiResponse<CategorieItem[]>>(
        "Panel/Category/GetCategories"
      );
      return res.data;
    } catch (err) {
      console.log(err);
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
      throw new Error("Failed to fetch category");
    }
  },
  getChilds: async (parentId: string, Size: number, Page: number) => {
    try {
      const res = await http.get<HttpResponseList<CategorieItem>>(
        "Panel/Category/GetChilds",
        {
          params: {
            parentId,
            Size,
            Page,
            Sort: "createdOn desc",
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch child of category");
    }
  },
};
