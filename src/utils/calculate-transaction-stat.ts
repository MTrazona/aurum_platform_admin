import type { TransactionData } from "@/types/transaction.types";
import {
  isSameMonth,
  parseISO,
  subMonths
} from "date-fns";
import { useMemo } from "react";

export function useTransactionStats(transactions: TransactionData[]) {
  return useMemo(() => {
    const monthsBack = 6;
    const now = new Date();

    const generateMonthlyData = (getValue: (tx: TransactionData) => number) => {
      const monthly: number[] = [];

      for (let i = monthsBack - 1; i >= 0; i--) {
        const targetMonth = subMonths(now, i);
        const total = transactions.reduce((sum, tx) => {
          const txDate = parseISO(tx.trDate);
          return isSameMonth(txDate, targetMonth)
            ? sum + getValue(tx)
            : sum;
        }, 0);
        monthly.push(total);
      }

      const last = monthly[monthsBack - 1] || 0;
      const prev = monthly[monthsBack - 2] || 0;

      const percentage =
        prev === 0
          ? "+0%"
          : `${((last - prev) / prev >= 0 ? "+" : "") +
              ((Math.abs(last - prev) / (prev || 1)) * 100).toFixed(2)}%`;

      return { bars: monthly, percentageChange: percentage };
    };

    const totalTransactions = transactions.length;
    const totalVolume = transactions.reduce((sum, tx) => sum + parseFloat(tx.toValue || "0"), 0);
    const terminatedCount = transactions.filter(tx => tx.statusOfTermination !== null).length;
    const averageFee =
      transactions.reduce((sum, tx) => sum + parseFloat(tx.transactionFee || "0"), 0) /
      (totalTransactions || 1);

    return {
      totalTransactions,
      totalVolume,
      terminatedCount,
      averageFee,

      volumeStats: generateMonthlyData(tx => parseFloat(tx.toValue || "0")),
      transactionStats: generateMonthlyData(() => 1),
      terminationStats: generateMonthlyData(tx => (tx.statusOfTermination ? 1 : 0)),
      feeStats: generateMonthlyData(tx => parseFloat(tx.transactionFee || "0")),
    };
  }, [transactions]);
}
