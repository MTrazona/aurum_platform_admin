import GAERequestDetailsModal from "@/components/dialog/gae-request";
import useGaeRequests from "@/hooks/gae-requests";
import GAEDataTable from "./table";

const GAERequestsPage = () => {
  const {
    gae,
    selectedRequest,
    isLoading,
    setSelectedRequest,
    viewRequest,
  } = useGaeRequests();
  return (
    <div>
      <GAEDataTable
        gae={gae?.filter((v) => v.fromCurrency.toLowerCase() === "php") || []}
        isLoading={isLoading}
        viewRequest={viewRequest}
      />
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
