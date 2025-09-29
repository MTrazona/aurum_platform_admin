import api from "@/config/axios";
import type { RedemptionBusiness } from "@/types/redemption.type";

export const redemptionApi = {
  // ✅ Get all merchant redemptions
  getAll: async (): Promise<RedemptionBusiness[]> => {
    const response = await api.get("/get-merchant-redemption");
    return response.data;
  },

  // ✅ Create a new merchant redemption
  create: async (data: FormData): Promise<RedemptionBusiness> => {
    const response = await api.post("/add-merchant-redemption", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};