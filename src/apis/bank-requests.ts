/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios";
import type { BankAccountVerification } from "@/types/bank-request.types";

export const getAllBankRequestofUser = async (): Promise<
  BankAccountVerification[]
> => {
  try {
    const res = await api.get<{ data: BankAccountVerification[] }>(
      "/list-bank-request-admin"
    );
    return res.data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("getAllBankRequestofUser Error:", error.message);
    } else {
      console.error("getAllBankRequestofUser Unknown error:", error);
    }
    return [];
  }
};

export const checkedBankRequestofUser = async (data: any): Promise<void> => {
  try {
    const res = await api.put(`/verify-bank-request/${data.id}`,data);
    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
