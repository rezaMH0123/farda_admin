import axios from "axios";

// http://46.224.6.83:8082/api/v1/
const http = axios.create({
  baseURL: import.meta.env.VITE_APP_ADMINFARDA,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;
