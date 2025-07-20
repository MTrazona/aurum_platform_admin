import { useState } from "react";
import useTransactionList from "./transactions-list";
import type { TransactionsType } from "@/types/buy-request.types";

export default function useGcaRequests() {
  const { convert, isLoading } = useTransactionList();
  const [selectedRequest, setSelectedRequest] = useState<TransactionsType | null>(
    null
  );
  const viewRequest = (request: TransactionsType) => {
    setSelectedRequest(request);
  };
  const releaseGCA = async({
    releaseDate,
    file,
  }: {
    releaseDate: Date;
    file: File;
  }) => {
    console.log(releaseDate,file)
  }
  return {
    convert,
    selectedRequest,
    isLoading,
    setSelectedRequest,
    viewRequest,
    releaseGCA
  };
}
