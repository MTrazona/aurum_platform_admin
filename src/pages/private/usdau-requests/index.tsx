import useUSDAURequests from "@/hooks/usdau-requests";
import USDAUTransactionsDataTable from "./table";

const USDAURequestsPage = () => {
  const { data, isLoading, selectedRequest, setSelectedRequest, viewRequest } =
    useUSDAURequests();
  return (
    <div>
      <USDAUTransactionsDataTable
        usdauReq={data ?? []}
        isLoading={isLoading}
        viewRequest={viewRequest}
      />
    </div>
  );
};

export default USDAURequestsPage;
