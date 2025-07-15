import { getAllUserTransactions } from "@/apis/transaction-list";
import type { TransactionData } from "@/types/transaction.types";
import { useQuery } from "@tanstack/react-query";

export default function useTransactionList() {
  const { data, isLoading } = useQuery({
    queryKey: ["transaction-list"],
    queryFn: getAllUserTransactions,
  });

  return {
    all: data,
    buySell: data?.filter(
      (v: TransactionData) =>
        v.transactionType.toLowerCase() === "buy" ||
        v.transactionType.toLowerCase() === "sell"
    ),
    convert: data?.filter(
      (v: TransactionData) => v.transactionType.toLowerCase() === "gold convert"
    ),
    gae: data?.filter(
      (v: TransactionData) =>
        v.transactionType === "gae" ||
        v.transactionType === "gae extra" ||
        v.transactionType === "gae ph"
    ),
    isLoading,
  };
}
