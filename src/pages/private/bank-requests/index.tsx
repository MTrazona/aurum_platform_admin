import BankRequestDetailsModal from "@/components/dialog/bank-request";
import Breadcrumb from "@/components/routes-bread-crumb";
import StatCard from "@/components/stat-card";
import useBankRequestList from "@/hooks/bank-requests";
import { useBankRequestStats } from "@/utils/calculate-bank-requests";
import BankRequestDataTable from "./table";

const BankRequestsPage = () => {
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
  } = useBankRequestList();
  const stats = useBankRequestStats(data);

  return (
    <div className="p-4 space-y-6">
      <Breadcrumb />
      <h1 className="text-xl font-semibold text-white">Bank Requests</h1>
      <div className="flex gap-4 items-center">
        <StatCard
          title="Total Bank Requests"
          value={stats.total}
          percentageChange={stats.totalStats.percentageChange}
          description="last 6 months"
          bars={stats.totalStats.bars}
          color="orange"
        />
        <StatCard
          title="Approved"
          value={stats.approvedStats.count}
          percentageChange={stats.approvedStats.percentageChange}
          description="verified users"
          bars={stats.approvedStats.bars}
          color="green"
        />
        <StatCard
          title="Pending"
          value={stats.pendingStats.count}
          percentageChange={stats.pendingStats.percentageChange}
          description="awaiting review"
          bars={stats.pendingStats.bars}
          color="yellow"
        />
        <StatCard
          title="Rejected"
          value={stats.rejectedStats.count}
          percentageChange={stats.rejectedStats.percentageChange}
          description="denied requests"
          bars={stats.rejectedStats.bars}
          color="red"
        />
      </div>

      <BankRequestDataTable
        banks={data}
        isLoading={isLoading}
        viewRequest={viewRequest}
      />
      {selectedRequest && (
        <BankRequestDetailsModal
          data={selectedRequest}
          open={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={(id) => approveRequest(id)}
          onReject={(id, reason, other) => rejectRequest(id, reason, other)}
          isApproving={isApproving}
          isRejecting={isRejecting}
        />
      )}
    </div>
  );
};

export default BankRequestsPage;
