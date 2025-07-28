/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import useTransactionList from "./transactions-list";
import {
  Banknote,
  FileText,
  Repeat,
  ShieldCheck,
} from "lucide-react";
import type { User } from "@/types/customer.types";
import { fetchUsers } from "@/apis/users";
import { getUSDAURequests } from "@/apis/usdau-requests";
import type { TransactionsType } from "@/types/buy-request.types";
import { getAllUserTransactions } from "@/apis/transaction-list";
import { getAdminBalances } from "@/apis/token-price";
import type { BankAccountVerification } from "@/types/bank-request.types";
import { getAllBankRequestofUser } from "@/apis/bank-requests";

const normalize = (val: string) => val?.toLowerCase().trim();

export default function useDashboard() {
  // --- Data Fetching ---
  const { data: user = [], isLoading: loadingUsers } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: usdauReq, isLoading: loadingUsdau } = useQuery({
    queryKey: ["request-usdau"],
    queryFn: getUSDAURequests,
  });

  const {
    data: transactions = [],
    isLoading: loadingTransactions,
  } = useQuery<TransactionsType[]>({
    queryKey: ["transaction-list"],
    queryFn: getAllUserTransactions,
  });

  const { data: adminBalance, isLoading: loadingBalance } = useQuery<any>({
    queryKey: ["admin-balances"],
    queryFn: getAdminBalances,
  });

  const {
    data: bankRequests = [],
    isLoading: loadingBankRequests,
  } = useQuery<BankAccountVerification[]>({
    queryKey: ["bank-requests"],
    queryFn: getAllBankRequestofUser,
  });

  const { buySell, convert, gae } = useTransactionList();

  // --- Computed Values ---
  const totalVerifiedUsers = useMemo(
    () =>
      user.filter((u) =>
        ["approved", "verified"].includes(normalize(u?.kycVerified))
      ).length,
    [user]
  );

  const totalConsultant = useMemo(
    () =>
      user.filter(
        (u) => normalize(u.customer_rank?.rank_code?.rankName) === "consultant"
      ).length,
    [user]
  );

  const userCountByCountry = useMemo(() => {
    const map: Record<string, number> = {};
    user.forEach((u) => {
      const country = normalize(u.country || "unknown");
      map[country] = (map[country] || 0) + 1;
    });
    return map;
  }, [user]);

  const pendingBankApprovals = useMemo(
    () =>
      bankRequests.filter(
        (req) => normalize(req.statusOfVerification) === "pending"
      ).length,
    [bankRequests]
  );

  const pendingTransactionApprovals = useMemo(
    () =>
      transactions.filter(
        (txn) => normalize(txn.transactionStatus) === "pending"
      ).length,
    [transactions]
  );

  const pendingUsdauRequests = useMemo(
    () =>
      gae?.filter(
        (r) => normalize(r.transactionStatus) === "pending"
      ).length ?? 0,
    [gae]
  );

  // --- Dashboard Cards ---
  const rf = useMemo(
    () => [
      {
        label: "KYC Users",
        value: totalVerifiedUsers,
        description: "10% Decrease last week",
        icon: ShieldCheck,
      },
      {
        label: "Transactions",
        value: transactions.length,
        description: "10% Decrease last week",
        icon: Repeat,
      },
      {
        label: "Bank Requests",
        value: bankRequests.length,
        description: "10% Decrease last week",
        icon: Banknote,
      },
      {
        label: "USDAU Requests",
        value: gae?.length ?? 0,
        description: "10% Decrease last week",
        icon: FileText,
      },
    ],
    [totalVerifiedUsers, transactions, bankRequests, gae]
  );

  return {
    user,
    transactions,
    bankRequests,
    totalVerifiedUsers,
    totalConsultant,
    userCountByCountry,
    buySell,
    convert,
    gae,
    rf,
    usdauReq,
    adminBalance,
    pendingBankApprovals,
    pendingTransactionApprovals,
    pendingUsdauRequests,
    loading: {
      users: loadingUsers,
      transactions: loadingTransactions,
      bankRequests: loadingBankRequests,
      usdau: loadingUsdau,
      balance: loadingBalance,
    },
  };
}
