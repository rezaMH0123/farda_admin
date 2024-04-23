import http from "@/core/services/httpServices";
import { HttpApiResponse } from "@/types/httpResponse";
import { CategorieItem } from "@/types/models/Categories.type";

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
};
