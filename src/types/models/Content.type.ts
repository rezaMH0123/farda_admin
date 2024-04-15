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
