import { GetFromStorage } from "@/utils/storage";
import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const access_token = GetFromStorage("access_token");

  return access_token ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
