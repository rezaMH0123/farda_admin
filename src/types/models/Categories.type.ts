export type CategorieItem = {
  id: string;
  title: string;
  parentId: string;
  isPin: boolean;
  subCategories: CategorieItem[];
};

export type CategoryMain = {
  title: string;
  parentId: string;
  isPin: boolean;
  subCategories: CategoryMain[];
  id: string;
  createdOn: string;
  modifiedOn: string;
  createdBy: string;
  modifiedBy: string;
};
