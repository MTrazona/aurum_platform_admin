import type { Customer } from "./transaction.types";

export interface USDAUWallet {
  id: number;
  balance: string;
  documentId: string;
  locale: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  updatedDate: string;
  usdau_histories: USDAUHistory[];
}

export interface USDAUHistory {
  id: number;
  amountTransaction: string;
  createdAt: string;
  date: string;
  description: string;
  documentId: string;
  endingBalance: string | null;
  locale: string | null;
  previousBalance: string | null;
  publishedAt: string;
  transactionAmount: string | null;
  updatedAt: string;
  username: string | null;
}

export interface USDAUTransactions {
  id: number;
  amountRequest: string;
  fromValue: string;
  fee: string;
  usdRate: string;
  dateRequest: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  requestStatus: string;
  trans_id: string;
  documentId: string;
  walletAddress: string;
  customer: Customer;
  usdauWallet: USDAUWallet;
}
