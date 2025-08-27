import BuyRequestDetailsModal from "@/components/dialog/buy-request";
import Breadcrumb from "@/components/routes-bread-crumb";
import StatCard from "@/components/stat-card";
import useBuyRequests from "@/hooks/buy-request";
import { useTransactionRequestStats } from "@/utils/calculate-buy-requests";
import { formatNumber } from "@/utils/format-helper";
import BuyDataTable from "./table";
import TransactionDetailsSheet from "@/components/sheets/gca-transaction-details-sheet";

const BuyRequestsPage = () => {
  const {
    data = [],
    isLoading,
    selectedRequest,
    isApproving,
    isRejecting,
    viewRequest,
    setSelectedRequest,
    approveRequest,
    rejectRequest,
  } = useBuyRequests();
  const stats = useTransactionRequestStats(data);

  return (
    <div className="space-y-6">
      <Breadcrumb />
      <h1 className="text-xl font-semibold text-white">Buy Requests</h1>

      <div className="flex gap-4">
        <StatCard
          title="Total Buy Requests"
          value={stats.total}
          percentageChange={stats.totalStats.percentageChange}
          description="vs. last 6 days"
          bars={stats.totalStats.bars}
          color="blue"
        />
        <StatCard
          title="Approved"
          value={`${stats.approvedStats.count}`}
          percentageChange={stats.approvedStats.percentageChange}
          description={`₱${formatNumber(stats.totalStats.totalVolume)} in fees`}
          bars={stats.approvedStats.bars}
          color="green"
        />

        <StatCard
          title="Pending"
          value={stats.pendingStats.count}
          percentageChange={stats.pendingStats.percentageChange}
          description="awaiting review"
          bars={stats.pendingStats.bars}
          color="orange"
        />
        <StatCard
          title="Rejected"
          value={stats.rejectedStats.count}
          percentageChange={stats.rejectedStats.percentageChange}
          description="denied"
          bars={stats.rejectedStats.bars}
          color="red"
        />
      </div>
      <BuyDataTable
        buy={data}
        isLoading={isLoading}
        viewRequest={viewRequest}
      />
      {selectedRequest && selectedRequest.transactionStatus === "Pending" ? (
        <BuyRequestDetailsModal
          data={selectedRequest}
          open={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={(id) => approveRequest(id)}
          onReject={(id, reason, other) => rejectRequest(id, reason, other)}
          isApproving={isApproving}
          isRejecting={isRejecting}
        />
      ) :  <TransactionDetailsSheet
          open={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          transaction={selectedRequest}
        />}
    </div>
  );
};

export default BuyRequestsPage;
