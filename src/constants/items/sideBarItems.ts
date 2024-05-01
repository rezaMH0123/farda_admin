import IconCategories from "@/components/Icons/CategoriesIcon";
import IconComment from "@/components/Icons/CommentIcon";
import IconContent from "@/components/Icons/ContentIcon";
import IconLabels from "@/components/Icons/LabelsIcon";
import IconMageFiles from "@/components/Icons/ManageFilesIcon";
import { IconProps } from "@/types/IconProps";

type SideBarItem = {
  link: string;
  childLink?: string;
  icon: React.FC<IconProps>;
  title: string;
};

export const sidebarItems: SideBarItem[] = [
  {
    link: "/content",
    childLink: "/content/add",
    icon: IconContent,
    title: "محتوا",
  },
  {
    link: "/categories",
    icon: IconCategories,
    title: "دسته بندی‌ها",
  },
  {
    link: "/labels",
    icon: IconLabels,
    title: "برچسب‌ها",
  },

  // {
  //   link: "/comment",
  //   icon: IconComment,
  //   title: "کامنت ها",
  // },
  {
    link: "/manageFiles",
    icon: IconMageFiles,
    title: "مدیریت فایل‌ها",
  },
];
