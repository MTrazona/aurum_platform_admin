import api from "@/config/axios";
import type { TransactionsType } from "@/types/buy-request.types";

export const getAllUserTransactions = async (): Promise<TransactionsType[]> => {
  try {
    const res = await api.get<{ data: { data: TransactionsType[] } }>(
      "/users-transaction"
    );
    const data = res.data.data.data;
    return data.sort((a: TransactionsType, b: TransactionsType) => {
      return new Date(b.trDate).getTime() - new Date(a.trDate).getTime();
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("getAllUserTransactions Error:", error.message);
    } else {
      console.error("getAllUserTransactions Unknown error:", error);
    }
    return [];
  }
};
