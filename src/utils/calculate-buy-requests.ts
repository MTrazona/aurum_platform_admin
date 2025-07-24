import type { TransactionsType } from "@/types/buy-request.types";

type StatTrend = {
  count: number;
  percentageChange: string;
  bars: number[];
  totalVolume: number;
};

function formatMonth(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}

export function useTransactionRequestStats(data: TransactionsType[]) {
  const total = data.length;

  const statusBuckets = {
    approved: [] as typeof data,
    pending: [] as typeof data,
    rejected: [] as typeof data,
  };

  data.forEach((d) => {
    switch (d.transactionStatus) {
      case "Open":
      case "Completed":
        statusBuckets.approved.push(d);
        break;
      case "Rejected":
        statusBuckets.rejected.push(d);
        break;
      default:
        statusBuckets.pending.push(d);
        break;
    }
  });

  const { approved, pending, rejected } = statusBuckets;

  const makeBarsAndVolume = (filtered: TransactionsType[]) => {
    const map = new Map<string, number>();
    let volume = 0;

    filtered.forEach((d) => {
      const key = formatMonth(new Date(d.trDate));
      const fee = parseFloat(d.transactionFee || "0") || 0;
      volume += fee;
      map.set(key, (map.get(key) || 0) + 1);
    });

    const bars: number[] = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const key = formatMonth(date);
      bars.push(map.get(key) || 0);
    }

    return { bars, volume };
  };

  const calcStats = (
    filtered: TransactionsType[],
    bars: number[],
    volume: number
  ): StatTrend => {
    const prev = bars.slice(0, -1).reduce((a, b) => a + b, 0);
    const last = bars.at(-1) || 0;
    const percentageChange =
      prev === 0 ? "+0%" : `${(((last - prev) / prev) * 100).toFixed(2)}%`;
    return {
      count: filtered.length,
      percentageChange,
      bars,
      totalVolume: volume,
    };
  };

  const all = makeBarsAndVolume(data);
  const approvedData = makeBarsAndVolume(approved);
  const pendingData = makeBarsAndVolume(pending);
  const rejectedData = makeBarsAndVolume(rejected);

  return {
    total,
    totalStats: calcStats(data, all.bars, all.volume),
    approvedStats: calcStats(approved, approvedData.bars, approvedData.volume),
    pendingStats: calcStats(pending, pendingData.bars, pendingData.volume),
    rejectedStats: calcStats(rejected, rejectedData.bars, rejectedData.volume),
  };
}
