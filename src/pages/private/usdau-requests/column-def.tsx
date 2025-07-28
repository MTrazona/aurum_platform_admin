import type {
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
} from "ag-grid-community";
import type { USDAUTransactions } from "@/types/usdau-request.types";
import { dateStringFormatter, PriceFormat } from "@/utils/format-helper";
import StatusChip from "@/components/status-chip";
import { Button } from "@/components/ui/button";

export const usdauRequestColumnDefs = (
  onView: (row: USDAUTransactions) => void
): ColDef<USDAUTransactions>[] => [
  {
    headerName: "Transaction ID",
    field: "trans_id",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Amount Request",
    field: "amountRequest",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<USDAUTransactions>) =>
      data ? <p>{PriceFormat(data.amountRequest)}</p> : null,
  },
  {
    headerName: "Fee",
    field: "fee",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<USDAUTransactions>) =>
      data ? <p>{PriceFormat(data.fee)}</p> : null,
  },
  {
    headerName: "USD Rate",
    field: "usdRate",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<USDAUTransactions>) =>
      data ? <p>{PriceFormat(data.usdRate)}</p> : null,
  },
  {
    headerName: "Wallet Address",
    field: "walletAddress",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "USDAU History",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<USDAUTransactions>) => (
      <p className="w-full text-center">{data?.usdauWallet?.usdau_histories?.length ?? 0}</p>
    ),
  },
  {
    headerName: "Request Status",
    field: "requestStatus",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<USDAUTransactions>) =>
      data ? <StatusChip status={data.requestStatus} /> : null,
  },
  {
    headerName: "Requested Date",
    field: "dateRequest",
    sortable: true,
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    filterParams: { buttons: ["reset", "apply"] },
    valueFormatter: ({ value }: ValueFormatterParams) =>
      value ? dateStringFormatter(value) : "",
  },
  {
    headerName: "Actions",
    width: 100,
    pinned: "right",
    cellRenderer: ({ data }: ICellRendererParams<USDAUTransactions>) =>
      data ? (
        <Button
          variant="outline"
          className="bg-primary cursor-pointer"
          onClick={() => onView(data)}
        >
          View
        </Button>
      ) : null,
  },
];
