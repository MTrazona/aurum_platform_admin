import { axiosInstance } from "@/config/axios";
import type { 
  Charity, 
  CreateCharityRequest, 
  UpdateCharityRequest, 
  CharityFilters 
} from "@/types/charity.types";

const BASE_URL = "/charities";

export const charitiesApi = {
  // Get all charities with optional filters
  getAll: async (filters?: CharityFilters): Promise<Charity[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.category) params.append("category", filters.category);
    if (filters?.status) params.append("status", filters.status);
    if (filters?.country) params.append("country", filters.country);

    const response = await axiosInstance.get(`${BASE_URL}?${params.toString()}`);
    return response.data;
  },

  // Get charity by ID
  getById: async (id: number): Promise<Charity> => {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Create new charity
  create: async (data: CreateCharityRequest): Promise<Charity> => {
    const response = await axiosInstance.post(BASE_URL, data);
    return response.data;
  },

  // Update charity
  update: async (id: number, data: UpdateCharityRequest): Promise<Charity> => {
    const response = await axiosInstance.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  // Delete charity
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${BASE_URL}/${id}`);
  },

  // Update charity status
  updateStatus: async (id: number, status: string): Promise<Charity> => {
    const response = await axiosInstance.patch(`${BASE_URL}/${id}/status`, { status });
    return response.data;
  },

  // Upload charity image
  uploadImage: async (id: number, imageFile: File): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append("image", imageFile);
    
    const response = await axiosInstance.post(`${BASE_URL}/${id}/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
