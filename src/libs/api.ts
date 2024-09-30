import axios from "axios";
import Cookies from "js-cookie";

// Mengambil base URL dari environment variable
const baseURL = import.meta.env.VITE_BACKEND_URL;

// Membuat instance Axios
export const apiV1 = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    "Content-Type": "application/json", 
    ...(Cookies.get("token") && { Authorization: `Bearer ${Cookies.get("token")}` }),
  },
});
