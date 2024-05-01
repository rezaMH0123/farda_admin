import Layout from "@/components/Layout";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/auth/SignIn";
import { Navigate, createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./privateRoute";
import MainPage from "@/pages/main";
import Content from "@/sections/content";
import ManageFile from "@/sections/manageFiles";
import Categories from "@/sections/categories";
import Comment from "@/sections/comment";
import Labels from "@/sections/labels";
import AddContent from "@/sections/content/AddContent";
import CategoryPage from "@/sections/categories/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <MainPage />,
            children: [
              {
                path: "/content",
                element: <Content />,
                children: [
                  {
                    path: "add",
                    element: <AddContent />,
                  },
                ],
              },
              {
                path: "/comment",
                element: <Comment />,
              },
              {
                path: "/manageFiles",
                element: <ManageFile />,
              },
              {
                path: "/categories",
                element: <Categories />,
                children: [
                  {
                    path: ":name",
                    element: <CategoryPage />,
                  },
                ],
              },
              {
                path: "/labels",
                element: <Labels />,
              },
              {
                path: "/",
                element: <Navigate to="/content" replace />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
