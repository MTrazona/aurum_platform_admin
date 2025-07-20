import {
  checkedBankRequestofUser,
  getAllBankRequestofUser,
} from "@/apis/bank-requests";
import { queryClient } from "@/main";
import type { BankAccountVerification } from "@/types/bank-request.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useBankRequestList() {
  const { data, isLoading } = useQuery<BankAccountVerification[]>({
    queryKey: ["bank-requests"],
    queryFn: getAllBankRequestofUser,
  });

  const [selectedRequest, setSelectedRequest] =
    useState<BankAccountVerification | null>(null);

  const approveMutation = useMutation({
    mutationFn: (id: number) =>
      checkedBankRequestofUser({
        id,
        statusOfVerification: "Approved",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bank-requests"] });
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
      checkedBankRequestofUser({
        id: variables.id,
        statusOfVerification: "Rejected",
        rejectedReason: variables.rejectedReason,
        rejectedReasonOptional: variables.rejectedReasonOptional,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bank-requests"] });
      setSelectedRequest(null);
      // toast.success("Bank request rejected.");
    },
    onError: (error) => {
      console.error("Reject failed:", error);
      // toast.error("Failed to reject request.");
    },
  });

  const viewRequest = (request: BankAccountVerification) => {
    setSelectedRequest(request);
  };

  return {
    data: data || [],
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
