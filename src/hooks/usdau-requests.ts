import { approveUsdauRequest, getUSDAURequests } from "@/apis/usdau-requests";
import { queryClient } from "@/main";
import type { USDAUTransactions } from "@/types/usdau-request.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useUSDAURequests() {
  const { data, isLoading } = useQuery({
    queryKey: ["request-usdau"],
    queryFn: getUSDAURequests,
  });
  const [selectedRequest, setSelectedRequest] =
    useState<USDAUTransactions | null>(null);
  const [responseDialog, setResponseDialog] = useState<{
    open: boolean;
    message: string;
    status?: "success" | "error";
  }>({ open: false, message: "", status: "success" });

  const viewRequest = (request: USDAUTransactions) => {
    setSelectedRequest(request);
  };

  const approve = useMutation({
    mutationFn: (id: number) =>
      approveUsdauRequest({
        id,
        status: "Approved",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buy-requests"] });
      setSelectedRequest(null);
      setResponseDialog({
        open: true,
        message: "USDAU request approved successfully.",
        status: "success",
      });
    },
    onError: (error) => {
      console.error("Approve failed:", error);
      setResponseDialog({
        open: true,
        message: "Failed to approve USDAU request.",
        status: "error",
      });
    },
  });

  const reject = useMutation({
    mutationFn: (variables: {
      id: number;
      rejectedReason: string;
      rejectedReasonOptional?: string;
    }) =>
      approveUsdauRequest({
        id: variables.id,
        status: "Declined",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buy-requests"] });
      setSelectedRequest(null);
      setResponseDialog({
        open: true,
        message: "USDAU request declined successfully.",
        status: "success",
      });
    },
    onError: (error) => {
      console.error("Reject failed:", error);
      setResponseDialog({
        open: true,
        message: "Failed to decline USDAU request.",
        status: "error",
      });
    },
  });

  return {
    data,
    isLoading,
    selectedRequest,
    responseDialog,
    setSelectedRequest,
    setResponseDialog,
    viewRequest,
    approveRequest: approve.mutate,
    isApproving: approve.isPending,

    rejectRequest: reject.mutate,
    isRejecting: reject.isPending,
  };
}
