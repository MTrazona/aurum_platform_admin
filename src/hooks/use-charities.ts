import { useState, useEffect, useCallback } from "react";
import { charitiesApi } from "@/apis/charities";
import type { 
  Charity, 
  CreateCharityRequest, 
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
    const active = charities.filter(c => c.charity.is_active).length;
    const inactive = charities.filter(c => !c.charity.is_active).length;
    const pending = 0; // No pending status in new structure
    const suspended = 0; // No suspended status in new structure

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
    applyFilters,
    clearFilters,
    getStats,
  };
};
