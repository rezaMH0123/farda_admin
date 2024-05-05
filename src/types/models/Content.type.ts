export interface Advertisement {
  id: string;
  title: string;
  summary: string;
  file: string;
  fromDate: string;
  toDate: string;
  viewCount: number;
  isCommentAvailable: boolean;
  isShareAvailable: boolean;
  createdOn: string;
  language: {
    id: string;
    title: string;
    dir: "Rtl" | "Ltr";
    shortTitle: string;
  };
  status: "Preview" | "Publish";
  categories: Category[];
  tags: Tag[];
  sections: Section[];
  files: File[];
}

export interface SingleContentI {
  id: string;
  title: string;
  description: string;
  summary: string;
  file: string;
  fromDate: string;
  toDate: string;
  isCommentAvailable: boolean;
  isShareAvailable: boolean;
  viewCount: number | null;
  createdOn: string;
  language: {
    id: string;
    title: string;
    dir: "Rtl" | "Ltr";
    shortTitle: string;
  };
  status: string;
  categories: Category[];
  tags: Tag[];
  sections: Section[];
  files: File[];
}

interface Category {
  id: string;
  title: string;
}

interface Tag {
  id: string;
  title: string;
}

interface Section {
  id: string;
  title: string;
}

interface File {
  id: string;
  fileUrl: string;
  filename: string;
  extension: string;
  contentType: string;
}

export type postContentT = {
  title: string;
  description: string | undefined;
  summary: string;
  fileId: string | null;
  fromDate: string | undefined;
  toDate: string | undefined;
  isCommentAvailable: boolean;
  isShareAvailable: boolean;
  status: string;
  categoriesId: string[];
  tagsId: string[] | undefined;
  sectionsId: string[];
  fileIds: string[] | [];
  languageId: string;
};

export type editContentT = {
  id: string | undefined;
  title: string;
  description: string | undefined;
  summary: string;
  fileId: string | null | undefined;
  fromDate: string | undefined;
  toDate: string | undefined;
  isCommentAvailable: boolean;
  isShareAvailable: boolean;
  status: string;
  categoriesId: string[];
  tagsId: string[] | undefined;
  sectionsId: string[];
  fileIds: string[];
};
