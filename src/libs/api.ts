import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BACKEND_URL;
const baseURLV2 = import.meta.env.VITE_BACKEND_URLV2;

export const apiV1 = axios.create({
  baseURL: `${baseURL}/api/v1`,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export const apiV2 = axios.create({
  baseURL: `${baseURL}/api/v2`,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});