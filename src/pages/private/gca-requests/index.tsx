import GCARequestDetailsModal from "@/components/dialog/gca-request";
import ReleaseRequestModal from "@/components/dialog/release-gca-request";
import Breadcrumb from "@/components/routes-bread-crumb";
import StatCard from "@/components/stat-card";
import useGcaRequests from "@/hooks/gca-requests";
import { useTransactionRequestStats } from "@/utils/calculate-buy-requests";
import { formatNumber } from "@/utils/format-helper";
import GCADataTable from "./table";

const GCARequestsPage = () => {
  const {
    convert,
    selectedRequest,
    isLoading,
    setSelectedRequest,
    viewRequest,
    releaseGCA,
  } = useGcaRequests();
    const stats = useTransactionRequestStats(convert);
  return (
    <div className="space-y-6">
         <Breadcrumb />
      <h1 className="text-xl font-semibold text-white">GCA Requests</h1>
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
      <GCADataTable
        gca={convert}
        isLoading={isLoading}
        viewRequest={viewRequest}
      />
      {selectedRequest && selectedRequest.transactionStatus === "Pending" ? (
        <GCARequestDetailsModal
          data={selectedRequest}
          open={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={(id) => id}
          onReject={(id, reason, other) => (id, reason, other)}
          isApproving={false}
          isRejecting={false}
        />
      ) : (
        <ReleaseRequestModal
          onClose={() => setSelectedRequest(null)}
          onSubmitForm={releaseGCA}
          open={!!selectedRequest}
        />
      )}
    </div>
  );
};

export default GCARequestsPage;
