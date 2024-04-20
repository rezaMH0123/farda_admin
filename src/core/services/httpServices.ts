import axios from "axios";
import Cookies from "js-cookie";

//31.214.229.211:8082/api/v1/
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_ADMINFARDA,
});

http.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return error;
  }
);

export default http;
