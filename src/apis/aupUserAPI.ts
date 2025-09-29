import api from "@/config/axios";
import { AUPUserType } from "@/types/aupUser.type";


export const aupUserAPI = {
  // ✅ Get all merchant redemptions
  getAll: async (): Promise<AUPUserType[]> => {
    const response = await api.get("/unique-user");
    return response.data;
  },
};