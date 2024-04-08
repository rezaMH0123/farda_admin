import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoutes() {
  const location = useLocation();
  const access_token = Cookies.get("access_token");

  return access_token ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
}
