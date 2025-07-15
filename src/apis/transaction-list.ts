import api from "@/config/axios";
import type { TransactionData } from "@/types/transaction.types";

export const getAllUserTransactions = async (): Promise<TransactionData[]> => {
  try {
    const res = await api.get<{ data: { data: TransactionData[] } }>("/users-transaction");
    return res.data.data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("getAllUserTransactions Error:", error.message);
    } else {
      console.error("getAllUserTransactions Unknown error:", error);
    }
    return [];
  }
};
