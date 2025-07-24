import api from "@/config/axios";
import type { RankPromotionRequest } from "@/types/promotion-request.types";

export const getRequestsPromote = async (): Promise<RankPromotionRequest[]> => {
  try {
    const res = await api.get<RankPromotionRequest[]>("/get-request-promote-admin");
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("getRequestsPromote Error:", error.message);
    } else {
      console.error("getRequestsPromote Unknown error", error);
    }
    return [];
  }
};
