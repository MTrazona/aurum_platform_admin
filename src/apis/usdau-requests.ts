import api from "@/config/axios";
import type { USDAUTransactions } from "@/types/usdau-request.types";

export const getUSDAURequests = async (): Promise<USDAUTransactions[]> => {
  try {
    const res = await api.get("/get-usdau-request-admin");
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("getUSDAURequests Error:", error.message);
    } else {
      console.error("getUSDAURequests Unknown error:", error);
    }
    return [];
  }
};
