import StatusChip from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { dateStringFormatter } from "@/utils/format-helper";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const bankRequestColumnDefs = (onView: (row: any) => void) => [
  {
    headerName: "ID",
    field: "id",
    width: 70,
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Holder Name",
    field: "accountHolderName",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Account Number",
    field: "accountNumber",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Bank Name",
    field: "bankName",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Country",
    field: "accountCountry",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Currency",
    field: "currency",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Status",
    field: "statusOfVerification",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: (params: any) => (
      <StatusChip status={params.data.statusOfVerification} />
    ),
  },
  {
    headerName: "Date Entry",
    field: "dateEntry",
    sortable: true,
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: (params: any) => dateStringFormatter(params.data.dateEntry),
  },
  {
    headerName: "Actions",
    width: 120,
    pinned: "right",
    sortable: false,
    filter: false,
    cellRenderer: (params: any) => (
      <div className="flex justify-center items-center h-full w-full">
        <Button className="cursor-pointer" onClick={() => onView(params.data)}>
          View
        </Button>
      </div>
    ),
  },
];
