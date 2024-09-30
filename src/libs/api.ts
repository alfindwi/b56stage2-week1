import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const apiV1 = axios.create({
  baseURL: `${baseURL}api/v1`,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});
