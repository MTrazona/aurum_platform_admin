import type { BankAccountVerification } from "@/types/bank-request.types";
import {
    differenceInCalendarMonths,
    isValid,
    parseISO
} from "date-fns";
import { useMemo } from "react";


export function useBankRequestStats(data: BankAccountVerification[]) {
  return useMemo(() => {
    const monthsBack = 6;
    const now = new Date();

    const initBars = () => Array.from({ length: monthsBack }, () => 0);

    const totalBars = initBars();
    const approvedBars = initBars();
    const pendingBars = initBars();
    const rejectedBars = initBars();

    let approvedCount = 0;
    let pendingCount = 0;
    let rejectedCount = 0;

    for (const item of data) {
      const rawDate = item.dateEntry;
      if (!rawDate) continue;

      const entryDate = parseISO(rawDate);
      if (!isValid(entryDate)) continue;

      const monthDiff = differenceInCalendarMonths(now, entryDate);
      const monthIndex = monthsBack - 1 - monthDiff;

      if (monthIndex >= 0 && monthIndex < monthsBack) {
        totalBars[monthIndex]++;

        const status = item.statusOfVerification?.toLowerCase();
        if (status === "approved") {
          approvedCount++;
          approvedBars[monthIndex]++;
        } else if (status === "pending") {
          pendingCount++;
          pendingBars[monthIndex]++;
        } else if (status === "rejected") {
          rejectedCount++;
          rejectedBars[monthIndex]++;
        }
      }
    }

    const getPercentageChange = (bars: number[]) => {
      const last = bars[monthsBack - 1] || 0;
      const prev = bars[monthsBack - 2] || 0;

      return prev === 0
        ? "+0%"
        : `${((last - prev) / prev >= 0 ? "+" : "") +
            ((Math.abs(last - prev) / (prev || 1)) * 100).toFixed(2)}%`;
    };

    return {
      total: data.length,
      totalStats: {
        bars: totalBars,
        percentageChange: getPercentageChange(totalBars),
      },
      approvedStats: {
        count: approvedCount,
        bars: approvedBars,
        percentageChange: getPercentageChange(approvedBars),
      },
      pendingStats: {
        count: pendingCount,
        bars: pendingBars,
        percentageChange: getPercentageChange(pendingBars),
      },
      rejectedStats: {
        count: rejectedCount,
        bars: rejectedBars,
        percentageChange: getPercentageChange(rejectedBars),
      },
    };
  }, [data]);
}
