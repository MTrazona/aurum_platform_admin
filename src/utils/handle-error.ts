/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleApiError = (error: unknown) => {
  console.error("API Error:", error);
  if (error && typeof error === "object" && "response" in error) {
    throw (error as any).response?.data || error;
  }
  throw error;
};