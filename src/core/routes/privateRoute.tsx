import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoutes() {
  const location = useLocation();
  const access_token = localStorage.getItem("access_token");
  const isLogin = access_token;

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
}
