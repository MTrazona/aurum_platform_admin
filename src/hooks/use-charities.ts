import { useState, useEffect, useCallback } from "react";
import { charitiesApi } from "@/apis/charities";
import type { 
  Charity, 
  CreateCharityRequest, 
  UpdateCharityRequest, 
  CharityFilters 
} from "@/types/charity.types";

export const useCharities = () => {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CharityFilters>({});

  // Fetch charities
  const fetchCharities = useCallback(async (filters?: CharityFilters) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await charitiesApi.getAll(filters);
      setCharities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch charities");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create charity
  const createCharity = useCallback(async (data: CreateCharityRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const newCharity = await charitiesApi.create(data);
      setCharities(prev => [newCharity, ...prev]);
      return newCharity;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create charity");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update charity
  const updateCharity = useCallback(async (id: number, data: UpdateCharityRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedCharity = await charitiesApi.update(id, data);
      setCharities(prev => 
        prev.map(charity => 
          charity.id === id ? updatedCharity : charity
        )
      );
      return updatedCharity;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update charity");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete charity
  const deleteCharity = useCallback(async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      await charitiesApi.delete(id);
      setCharities(prev => prev.filter(charity => charity.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete charity");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update charity status
  const updateCharityStatus = useCallback(async (id: number, status: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedCharity = await charitiesApi.updateStatus(id, status);
      setCharities(prev => 
        prev.map(charity => 
          charity.id === id ? updatedCharity : charity
        )
      );
      return updatedCharity;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update charity status");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Upload charity image
  const uploadCharityImage = useCallback(async (id: number, imageFile: File) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await charitiesApi.uploadImage(id, imageFile);
      setCharities(prev => 
        prev.map(charity => 
          charity.id === id ? { ...charity, imageUrl: result.imageUrl } : charity
        )
      );
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Apply filters
  const applyFilters = useCallback((newFilters: CharityFilters) => {
    setFilters(newFilters);
    fetchCharities(newFilters);
  }, [fetchCharities]);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({});
    fetchCharities();
  }, [fetchCharities]);

  // Get statistics
  const getStats = useCallback(() => {
    const total = charities.length;
    const active = charities.filter(c => c.status === "Active").length;
    const inactive = charities.filter(c => c.status === "Inactive").length;
    const pending = charities.filter(c => c.status === "Pending").length;
    const suspended = charities.filter(c => c.status === "Suspended").length;

    return { total, active, inactive, pending, suspended };
  }, [charities]);

  // Initial fetch
  useEffect(() => {
    fetchCharities();
  }, [fetchCharities]);

  return {
    charities,
    isLoading,
    error,
    filters,
    fetchCharities,
    createCharity,
    updateCharity,
    deleteCharity,
    updateCharityStatus,
    uploadCharityImage,
    applyFilters,
    clearFilters,
    getStats,
  };
};
