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
    gae,
    selectedRequest,
    isLoading,
    setSelectedRequest,
    viewRequest,
    releaseGCA
  };
}
