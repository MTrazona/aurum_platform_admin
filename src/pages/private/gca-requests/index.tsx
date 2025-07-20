import CustomDataTable from "@/components/custom-data-table";
import useGcaRequests from "@/hooks/gca-requests";
import { gcaRequestColumnDefs } from "./colum-def";
import GCARequestDetailsModal from "@/components/dialog/gca-request";
import ReleaseGCARequestModal from "@/components/dialog/release-gca-request";

const GCARequestsPage = () => {
  const {
    convert,
    selectedRequest,
    isLoading,
    setSelectedRequest,
    viewRequest,
    releaseGCA,
  } = useGcaRequests();
  return (
    <div>
      <CustomDataTable
        columnDefs={gcaRequestColumnDefs((v) => viewRequest(v))}
        rowData={
          convert?.filter((v) => v.fromCurrency.toLowerCase() === "php") || []
        }
        loading={isLoading}
        paginationPageSize={20}
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
        <ReleaseGCARequestModal
          onClose={() => setSelectedRequest(null)}
          onSubmitForm={releaseGCA}
          open={!!selectedRequest}
        />
      )}
    </div>
  );
};

export default GCARequestsPage;
