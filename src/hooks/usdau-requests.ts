import { getUSDAURequests } from "@/apis/usdau-requests";
import type { USDAUTransactions } from "@/types/usdau-request.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useUSDAURequests() {
  const { data, isLoading } = useQuery({
    queryKey: ["request-usdau"],
    queryFn: getUSDAURequests,
  });
    const [selectedRequest, setSelectedRequest] = useState<USDAUTransactions | null>(
      null
    );
    const viewRequest = (request: USDAUTransactions) => {
      setSelectedRequest(request);
    };

  return {
    data,
    isLoading,
    selectedRequest,
    setSelectedRequest,
    viewRequest
  };
}
