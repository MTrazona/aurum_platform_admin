import api from "@/config/axios";
import type { 
  Charity, 
  CreateCharityRequest, 
  CharityFilters 
} from "@/types/charity.types";

export const charitiesApi = {
  // Get all charities with optional filters
  getAll: async (filters?: CharityFilters): Promise<Charity[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.country) params.append("country", filters.country);

    const response = await api.get(`/get-charity`);
    return response.data;
  },

  // Create new charity
  create: async (data: CreateCharityRequest): Promise<Charity> => {
    const response = await api.post("/add-charity", data);
    return response.data;
  },
};
