import useUSDAURequests from "@/hooks/usdau-requests";
import USDAUTransactionsDataTable from "./table";
import { USDAURequestModal } from "@/components/dialog/usdau-request";
import { ResponseMessageDialog } from "@/components/dialog/response-message";
import StatCard from "@/components/stat-card";
import useUsdauStats from "@/utils/calculate-usdau-stats";
import Breadcrumb from "@/components/routes-bread-crumb";

const USDAURequestsPage = () => {
  const {
    data,
    isLoading,
    selectedRequest,
    responseDialog,
    isApproving,
    isRejecting,
    setSelectedRequest,
    setResponseDialog,
    viewRequest,
    approveRequest,
    rejectRequest,
  } = useUSDAURequests();
  const stats = useUsdauStats(data ?? []);
  return (
    <div className="space-y-6">
      <Breadcrumb />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard
            key={i}
            title={s.title}
            value={s.value}
            percentageChange={s.percentageChange}
            description={s.description}
            bars={s.bars}
            icon={s.icon}
            color={s.color}
          />
        ))}
      </div>

      <USDAUTransactionsDataTable
        usdauReq={data ?? []}
        isLoading={isLoading || isRejecting || isApproving}
        viewRequest={viewRequest}
      />
      {selectedRequest && (
        <USDAURequestModal
          data={selectedRequest}
          isOpen={true}
          isApproving={isApproving}
          isRejecting={isRejecting}
          onClose={() => setSelectedRequest(null)}
          onApprove={async () => {
            if (selectedRequest) {
              approveRequest(selectedRequest.id);
            }
          }}
          onReject={async () => {
            if (selectedRequest) {
              rejectRequest({
                id: selectedRequest.id,
                rejectedReason: "Rejected by admin",
              });
            }
          }}
        />
      )}
      <ResponseMessageDialog
        isOpen={responseDialog.open}
        message={responseDialog.message}
        status={responseDialog.status}
        onClose={() => setResponseDialog((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};

export default USDAURequestsPage;
