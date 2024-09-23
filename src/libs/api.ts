import axios from "axios";


const baseURL = import.meta.env.VITE_BACKEND_URL;

export const apiV1 = axios.create({
  baseURL: `${baseURL}/api/v1`,
});