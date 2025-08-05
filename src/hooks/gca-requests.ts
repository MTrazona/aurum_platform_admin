import {
  ReleaseGCAPayload,
  releaseGCARequest,
  remarksGCARequest,
  updateGCARequest,
} from "@/apis/gca-request";
import { queryClient } from "@/main";
import type { TransactionsType } from "@/types/buy-request.types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import useTransactionList from "./transactions-list";

export default function useGcaRequests() {
  const { convert, isLoading } = useTransactionList();
  const [selectedRequest, setSelectedRequest] = useState<TransactionsType | null>(null);
  const [responseDialog, setResponseDialog] = useState<{
    open: boolean;
    message: string;
    status?: "success" | "error";
  }>({ open: false, message: "", status: "success" });

  const viewRequest = (request: TransactionsType) => {
    setSelectedRequest(request);
  };

  const releaseMutation = useMutation({
    mutationFn: async ({
      releaseDate,
      file,
    }: {
      releaseDate: Date;
      file: File;
    }) => {
      if (!selectedRequest) throw new Error("No selected request");

      const payload: ReleaseGCAPayload = {
        id: selectedRequest.id,
        receiptImageLinkAdmin: file,
        releaseDateAdmin: releaseDate,
      };

      return await releaseGCARequest(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction-list"] });
      setSelectedRequest(null)
      setResponseDialog({
        open: true,
        message: "GCA successfully released",
        status: "success",
      });
    },
    onError: (error: unknown) => {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Release Error:", err);
      setResponseDialog({
        open: true,
        message: err.response?.data?.message || err.message || "Failed to release GCA",
        status: "error",
      });
    },
  });

  const remarksMutation = useMutation({
    mutationFn: remarksGCARequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction-list"] });
      setSelectedRequest(null)
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
        message: err.response?.data?.message || err.message || "Failed to submit remarks",
        status: "error",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateGCARequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction-list"] });
      setSelectedRequest(null)
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
        message: err.response?.data?.message || err.message || "Failed to update request",
        status: "error",
      });
    },
  });

  const list = convert?.filter((v) => v.fromCurrency.toLowerCase() === "php") || [];

  return {
    convert: list,
    selectedRequest,
    isLoading,
    setSelectedRequest,
    viewRequest,
    releaseGCA: releaseMutation.mutateAsync,
    releaseLoading: releaseMutation.isPending,
    onUpdate: updateMutation.mutateAsync,
    onRemarks: remarksMutation.mutateAsync,
    remarksLoading: remarksMutation.isPending,
    updateLoading: updateMutation.isPending,
    responseDialog,
    setResponseDialog,
  };
}
