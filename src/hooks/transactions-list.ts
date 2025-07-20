import { getAllUserTransactions } from "@/apis/transaction-list";
import type { TransactionsType } from "@/types/buy-request.types";
import { useQuery } from "@tanstack/react-query";

export default function useTransactionList() {
  const { data, isLoading } = useQuery({
    queryKey: ["transaction-list"],
    queryFn: getAllUserTransactions,
  });

  return {
    all: data,
    buySell: data?.filter(
      (v: TransactionsType) =>
        v.transactionType.toLowerCase() === "buy" ||
        v.transactionType.toLowerCase() === "sell"
    ),
    convert: data?.filter(
      (v: TransactionsType) =>
        v.transactionType.toLowerCase() === "gold convert"
    ),
    gae: data?.filter(
      (v: TransactionsType) =>
        v.transactionType.toLowerCase() === "gae" ||
        v.transactionType.toLowerCase() === "gae extra" ||
        v.transactionType.toLowerCase() === "gae ph"
    ),
    isLoading,
  };
}
