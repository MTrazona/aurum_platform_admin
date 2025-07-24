import Breadcrumb from "@/components/routes-bread-crumb";
import StatCard from "@/components/stat-card";
import useTransactionList from "@/hooks/transactions-list";
import { useTransactionStats } from "@/utils/calculate-transaction-stat";
import { PriceFormat } from "@/utils/format-helper";
import TransactionsDataTable from "./table";

const TransactionsPage = () => {
  const { all = [], isLoading } = useTransactionList();
  const stats = useTransactionStats(all);

  return (
    <div className="p-4 space-y-6">
        <Breadcrumb />
      <h1 className="text-xl font-semibold text-white">User Transactions</h1>

      <div className="flex justify-between items-center gap-2">
        <StatCard
          title="Total Volume"
          value={PriceFormat(stats.totalVolume)}
          percentageChange={stats.volumeStats.percentageChange}
          description="USD received (monthly)"
          bars={stats.volumeStats.bars}
          color="green"
        />

        <StatCard
          title="Total Transactions"
          value={stats.totalTransactions}
          percentageChange={stats.transactionStats.percentageChange}
          description="in recent months"
          bars={stats.transactionStats.bars}
          color="blue"
        />

        <StatCard
          title="Terminated Contracts"
          value={stats.terminatedCount}
          percentageChange={stats.terminationStats.percentageChange}
          description="contracts terminated"
          bars={stats.terminationStats.bars}
          color="red"
        />

        <StatCard
          title="Average Fee"
          value={PriceFormat(stats.averageFee)}
          percentageChange={stats.feeStats.percentageChange}
          description="per transaction"
          bars={stats.feeStats.bars}
          color="purple"
        />
      </div>
      <TransactionsDataTable
        isLoading={isLoading}
        transactions={all}
      />
    </div>
  );
};

export default TransactionsPage;
