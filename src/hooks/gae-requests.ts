import type { TransactionsType } from "@/types/buy-request.types";
import { useState } from "react";
import useTransactionList from "./transactions-list";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
import { AxiosError } from "axios";
import { remarksGAERequest, updateGAERequest } from "@/apis/gae-request";

export default function useGaeRequests() {
  const { gae, isLoading } = useTransactionList();
  const [selectedRequest, setSelectedRequest] =
    useState<TransactionsType | null>(null);
  const [responseDialog, setResponseDialog] = useState<{
    open: boolean;
    message: string;
    status?: "success" | "error";
  }>({ open: false, message: "", status: "success" });

  const viewRequest = (request: TransactionsType) => {
    setSelectedRequest(request);
  };
  const releaseGAE = async ({
    releaseDate,
    file,
  }: {
    releaseDate: Date;
    file: File;
  }) => {
    console.log(releaseDate, file);
  };

  const remarksMutation = useMutation({
    mutationFn: remarksGAERequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction-list"] });
      setSelectedRequest(null);
      setResponseDialog({
        open: true,
        message: "Remarks submitted successfully",
        status: "success",
      });
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Remarks Error:", err);
      setResponseDialog({
        open: true,
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to submit remarks",
        status: "error",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateGAERequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction-list"] });
      setSelectedRequest(null);
      setResponseDialog({
        open: true,
        message: "Request successfully updated",
        status: "success",
      });
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Update Error:", err);
      setResponseDialog({
        open: true,
        message:
          err.response?.data?.message ||
          err.message ||
          "Failed to update request",
        status: "error",
      });
    },
  });
  const list = gae?.filter((v) => v.fromCurrency.toLowerCase() === "php") || [];
  return {
    gae: list,
    selectedRequest,
    isLoading,
    responseDialog,
    setResponseDialog,
    setSelectedRequest,
    viewRequest,
    onUpdate: updateMutation.mutateAsync,
    onRemarks: remarksMutation.mutateAsync,
    remarksLoading: remarksMutation.isPending,
    updateLoading: updateMutation.isPending,
    releaseGAE,
  };
}
