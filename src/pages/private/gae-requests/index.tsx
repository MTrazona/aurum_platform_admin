import GAERequestDetailsModal from "@/components/dialog/gae-request";
import useGaeRequests from "@/hooks/gae-requests";
import GAEDataTable from "./table";
import { useTransactionRequestStats } from "@/utils/calculate-buy-requests";
import StatCard from "@/components/stat-card";
import { formatNumber } from "@/utils/format-helper";
import Breadcrumb from "@/components/routes-bread-crumb";

const GAERequestsPage = () => {
  const { gae, selectedRequest, isLoading, setSelectedRequest, viewRequest,releaseGAE } =
    useGaeRequests();
  const stats = useTransactionRequestStats(gae);
  return (
    <div className="space-y-6">
      <Breadcrumb />
      <h1 className="text-xl font-semibold text-white">GAE Requests</h1>
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
      <GAEDataTable gae={gae} isLoading={isLoading} viewRequest={viewRequest} />
      {selectedRequest && (
        <GAERequestDetailsModal
          data={selectedRequest}
          open={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={(id) => id}
          onReject={(id, reason, other) => (id, reason, other)}
          isApproving={false}
          isRejecting={false}
        />
      )}
    </div>
  );
};

export default GAERequestsPage;
