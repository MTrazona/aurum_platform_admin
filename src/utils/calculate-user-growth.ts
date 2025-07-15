/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "@/types/customer.types";
import { parseISO, isValid, getMonth, getYear } from "date-fns";

export function calculateUserGrowth(users: User[]) {
  const now = new Date();
  const currentMonth = getMonth(now);
  const currentYear = getYear(now);

  let thisMonthCount = 0;
  let lastMonthCount = 0;
  const bars = new Array(6).fill(0);

  users.forEach((user) => {
    if (!user.createdAt) return;

    try {
      const createdDate = parseISO(user.createdAt);
      if (!isValid(createdDate)) return;

      const userMonth = getMonth(createdDate);
      const userYear = getYear(createdDate);

      const monthDiff =
        (currentYear - userYear) * 12 + (currentMonth - userMonth);

      if (monthDiff >= 0 && monthDiff < 6) {
        bars[5 - monthDiff] += 1;
      }

      if (monthDiff === 0) thisMonthCount++;
      if (monthDiff === 1) lastMonthCount++;
    } catch (error: any) {
      console.warn(
        `Invalid date for user ID ${user.id}:${error.message}`,
        user.createdAt
      );
    }
  });

  let percentageChange = "0.00%";
  if (lastMonthCount > 0) {
    const change = ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;
    percentageChange = `${change.toFixed(2)}%`;
  } else if (thisMonthCount > 0) {
    percentageChange = "∞%";
  }

  return {
    thisMonth: thisMonthCount,
    lastMonth: lastMonthCount,
    percentage: percentageChange,
    bars,
  };
}
