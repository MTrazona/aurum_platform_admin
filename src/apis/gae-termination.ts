import api from "@/config/axios";
import type { GAETerminationResponse } from "@/types/gae-termination.types";

export const listGAETerminate = async (id: string | number): Promise<GAETerminationResponse | null> => {
  try {
    const response = await api.get(`/all-partial-gae/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching GAE termination data:", error);
    return null;
  }
};
