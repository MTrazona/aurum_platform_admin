import StatusChip from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { dateStringFormatter } from "@/utils/format-helper";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const bankRequestColumnDefs = (onView: (row: any) => void) => [
  { headerName: "ID", field: "id", width: 70 },
  { headerName: "Holder Name", field: "accountHolderName" },
  { headerName: "Account Number", field: "accountNumber" },
  { headerName: "Bank Name", field: "bankName" },
  { headerName: "Country", field: "accountCountry" },
  { headerName: "Currency", field: "currency" },
  {
    headerName: "Status",
    cellRenderer: (params: any) => (
      <StatusChip status={params.data.statusOfVerification} />
    ),
  },
  {
    headerName: "Date Entry",
    cellRenderer: (params: any) => dateStringFormatter(params.data.dateEntry),
  },
  {
    headerName: "Actions",
    width: 120,
     pinned: "right",
    cellRenderer: (params: any) => (
      <div className="flex justify-center items-center h-full w-full">
        <Button
          className="cursor-pointer"
          onClick={() => onView(params.data)}
        >
          View
        </Button>
      </div>
    ),
  },
];
