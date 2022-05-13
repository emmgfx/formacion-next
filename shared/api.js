import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OC_APIURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
