import type { TransactionsType } from '@/types/buy-request.types';
import { useState } from 'react';
import useTransactionList from './transactions-list';

export default function useGaeRequests() {
  const { gae, isLoading } = useTransactionList();
  const [selectedRequest, setSelectedRequest] = useState<TransactionsType | null>(
    null
  );
  const viewRequest = (request: TransactionsType) => {
    setSelectedRequest(request);
  };
  const releaseGAE = async({
    releaseDate,
    file,
  }: {
    releaseDate: Date;
    file: File;
  }) => {
    console.log(releaseDate,file)
  }
  const list = gae?.filter((v) => v.fromCurrency.toLowerCase() === "php") || [];
  return {
    gae:list,
    selectedRequest,
    isLoading,
    setSelectedRequest,
    viewRequest,
    releaseGAE
  };
}
