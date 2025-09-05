import { useState, useEffect } from "react";
import { listGAETerminate } from "@/apis/gae-termination";
import type { GAETerminationResponse } from "@/types/gae-termination.types";

export const useGAETermination = (transactionId: string | number | null) => {
  const [data, setData] = useState<GAETerminationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGAETermination = async () => {
    if (!transactionId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await listGAETerminate(transactionId);
      setData(result);
    } catch (err) {
      setError("Failed to fetch GAE termination data");
      console.error("GAE termination fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (transactionId) {
      fetchGAETermination();
    }
  }, [transactionId]);

  return {
    data,
    loading,
    error,
    refetch: fetchGAETermination
  };
};
