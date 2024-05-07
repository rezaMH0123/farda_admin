import Layout from "@/components/Layout";
import NotFound from "@/pages/NotFound";
import SignIn from "@/pages/auth/SignIn";
import { Navigate, createBrowserRouter } from "react-router-dom";
import ManageFile from "@/sections/manageFiles";
import Categories from "@/pages/categories";
import Labels from "@/pages/labels";
import AddAndEditContentPage from "@/pages/content/AddAndEditContentPage";
import ContentPage from "@/pages/content";
import CategoryPage from "@/pages/categories/CategoriePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/content" replace />,
      },
      {
        path: "/content",
        element: <ContentPage />,
      },
      {
        path: "/content/edit/:id",
        element: <AddAndEditContentPage />,
      },
      {
        path: "/content/add",
        element: <AddAndEditContentPage />,
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
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
