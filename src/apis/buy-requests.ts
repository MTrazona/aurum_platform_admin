/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios";
import type { TransactionsType } from "@/types/buy-request.types";

export const getAllBuyRequestofUser = async (): Promise<TransactionsType[]> => {
  try {
    const res = await api.get("/deposit-request-list");
    const data = res.data.data.data;
    return data.sort((a: TransactionsType, b: TransactionsType) => {
      return new Date(b.trDate).getTime() - new Date(a.trDate).getTime();
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
export const checkedBuyRequest = async (data: any): Promise<void> => {
  try {
    const res = await api.put(`/request-approval/${data.id}`, data);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
