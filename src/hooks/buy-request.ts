import { checkedBuyRequest, getAllBuyRequestofUser } from "@/apis/buy-requests";
import { queryClient } from "@/main";
import type { TransactionsType } from "@/types/buy-request.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useBuyRequests() {
  const { data, isLoading } = useQuery<TransactionsType[]>({
    queryKey: ["buy-requests"],
    queryFn: getAllBuyRequestofUser,
  });
  const [selectedRequest, setSelectedRequest] = useState<TransactionsType | null>(
    null
  );

  const approveMutation = useMutation({
    mutationFn: (id: number) =>
      checkedBuyRequest({
        id,
        transactionStatus: "Completed",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buy-requests"] });
      setSelectedRequest(null);
      // toast.success("Bank request approved.");
    },
    onError: (error) => {
      console.error("Approve failed:", error);
      // toast.error("Failed to approve request.");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (variables: {
      id: number;
      rejectedReason: string;
      rejectedReasonOptional?: string;
    }) =>
      checkedBuyRequest({
        id: variables.id,
        transactionStatus: "Rejected",
        rejectReason: variables.rejectedReason,
        rejectReasonOptional: variables.rejectedReasonOptional,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buy-requests"] });
      setSelectedRequest(null);
      // toast.success("Bank request rejected.");
    },
    onError: (error) => {
      console.error("Reject failed:", error);
      // toast.error("Failed to reject request.");
    },
  });

  const viewRequest = (request: TransactionsType) => {
    setSelectedRequest(request);
  };
  return {
    data: data ?? [],
    isLoading,
    selectedRequest,
    setSelectedRequest,
    viewRequest,
    approveRequest: approveMutation.mutate,
    rejectRequest: (
      id: number,
      rejectedReason: string,
      rejectedReasonOptional?: string
    ) => rejectMutation.mutate({ id, rejectedReason, rejectedReasonOptional }),
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending,
  };
}
