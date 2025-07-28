import { getAllBankRequestofUser } from "@/apis/bank-requests";
import { getAllUserTransactions } from "@/apis/transaction-list";
import { fetchUsers } from "@/apis/users";
import type { BankAccountVerification } from "@/types/bank-request.types";
import type { TransactionsType } from "@/types/buy-request.types";
import type { User } from "@/types/customer.types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import useTransactionList from "./transactions-list";
import { Banknote, FileText, Repeat, ShieldCheck } from "lucide-react";

export default function useDashboard() {
  const { data: user = [] } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const { data: transactions = [] } = useQuery<TransactionsType[]>({
    queryKey: ["transaction-list"],
    queryFn: getAllUserTransactions,
  });

  const { data: bankRequests = [] } = useQuery<BankAccountVerification[]>({
    queryKey: ["bank-requests"],
    queryFn: getAllBankRequestofUser,
  });

  const { buySell, convert, gae } = useTransactionList();

  // ✅ Total verified (approved/verified) KYC users
  const totalVerifiedUsers = useMemo(() => {
    return user.filter(
      (u) =>
        u.kycVerified?.toLowerCase() === "approved" ||
        u.kycVerified?.toLowerCase() === "verified"
    ).length;
  }, [user]);

  // ✅ Total consultants (approved + verified email)
  const totalConsultant = useMemo(() => {
    return user.filter(
      (u) => u.kycVerified === "approved" && u.isVerifyEmail === true
    ).length;
  }, [user]);

  // ✅ User distribution by country (lowercased)
  const userCountByCountry = useMemo(() => {
    const map: Record<string, number> = {};
    user.forEach((u) => {
      const country = (u.country || "Unknown").toLowerCase();
      map[country] = (map[country] || 0) + 1;
    });
    return map;
  }, [user]);

  // ✅ Admin task counts
  const pendingBankApprovals = useMemo(() => {
    return bankRequests.filter(
      (req) => req.statusOfVerification?.toLowerCase() === "pending"
    ).length;
  }, [bankRequests]);

  const pendingTransactionApprovals = useMemo(() => {
    return transactions.filter(
      (txn) => txn.transactionStatus?.toLowerCase() === "pending"
    ).length;
  }, [transactions]);

  const pendingUsdauRequests = useMemo(() => {
    return gae?.filter((r) => r.transactionStatus?.toLowerCase() === "pending")
      .length;
  }, [gae]);

  const rf = [
    {
      label: "KYC Users",
      value: totalVerifiedUsers,
      description: "10% Decrease last week",
      icon: ShieldCheck, // Represents verification/KYC
    },
    {
      label: "Transactions",
      value: transactions.length,
      description: "10% Decrease last week",
      icon: Repeat, // Suggests exchange/transaction
    },
    {
      label: "Bank Requests",
      value: bankRequests.length,
      description: "10% Decrease last week",
      icon: Banknote, // Money-related request
    },
    {
      label: "USDAU Requests",
      value: gae?.length,
      description: "10% Decrease last week",
      icon: FileText, // Form/request document
    },
  ];

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
    pendingBankApprovals,
    pendingTransactionApprovals,
    pendingUsdauRequests,
  };
}
