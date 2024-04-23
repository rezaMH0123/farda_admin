export type CategorieItem = {
  id: string;
  title: string;
  parentId: string;
  isPin: boolean;
  subCategories: CategorieItem[];
};
