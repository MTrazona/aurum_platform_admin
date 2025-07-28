import StatusChip from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import type { BankAccountVerification } from "@/types/bank-request.types";
import { dateStringFormatter } from "@/utils/format-helper";
import type {
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
} from "ag-grid-community";


export const bankRequestColumnDefs = (
  onView: (row: BankAccountVerification) => void
): ColDef<BankAccountVerification>[] => [
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
    cellRenderer: ({ data }: ICellRendererParams<BankAccountVerification>) =>
      data ? <StatusChip status={data.statusOfVerification} /> : null,
  },
  {
    headerName: "Date Entry",
    field: "dateEntry",
    sortable: true,
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    filterParams: { buttons: ["reset", "apply"] },
    valueFormatter: ({ value }: ValueFormatterParams<BankAccountVerification>) =>
      value ? dateStringFormatter(value) : "",
  },
  {
    headerName: "Actions",
    width: 120,
    pinned: "right",
    sortable: false,
    filter: false,
    cellRenderer: ({ data }: ICellRendererParams<BankAccountVerification>) =>
      data ? (
        <div className="flex justify-center items-center h-full w-full">
          <Button className="cursor-pointer" onClick={() => onView(data)}>
            View
          </Button>
        </div>
      ) : null,
  },
];
