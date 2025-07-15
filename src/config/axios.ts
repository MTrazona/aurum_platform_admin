import useStore from "@/zustand/store/store";
import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "https://api.aurumfinancial.xyz/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const isPublic = config.isPublic || false;

    if (!isPublic) {
      const { jwt } = useStore.getState().admin;
      const accessToken = jwt;
      if (accessToken) {
        config.headers.set?.("Authorization", `Bearer ${accessToken}`);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
