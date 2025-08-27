import StatusChip from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import type { TransactionsType } from "@/types/buy-request.types";
import {
  dateStringFormatter,
  formatTransactionCode,
  PriceFormat,
} from "@/utils/format-helper";
import type {
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";

export const transactionColumnDefs = (
  onViewClick: (transaction: TransactionsType) => void
): ColDef<TransactionsType>[] => [
  {
    headerName: "Customer Email",
    colId: "customerEmail",
    hide: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    valueGetter: ({ data }: ValueGetterParams<TransactionsType, string>) =>
      (data as any)?.customer?.email ?? "",
  },
  {
    headerName: "Transaction Code",
    field: "transactionCode",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <p>{formatTransactionCode(data.transactionCode)}</p> : null,
  },
  {
    headerName: "Transaction Type",
    field: "transactionType",
    minWidth: 150,
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Paid Amount",
    field: "fromValue",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? (
        <p>
          {PriceFormat(
            data.fromValue,
            data,
            data.fromCurrency === "QMGT" &&
              data.transactionType.toLowerCase() !== "buy",
            "fromValue"
          )}
        </p>
      ) : null,
  },
  {
    headerName: "Converted Amount",
    field: "toValue",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? (
        <p>
          {PriceFormat(
            data.toValue,
            data,
            data.toCurrency === "QMGT" &&
              data.transactionType.toLowerCase() !== "buy",
            "toValue"
          )}
        </p>
      ) : null,
  },
  {
    headerName: "Gold Price",
    field: "goldPrice",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? PriceFormat(data.goldPrice) : null,
  },
  {
    headerName: "USDT Rate",
    field: "usdRate",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? PriceFormat(data.usdRate) : null,
  },
  {
    headerName: "Status",
    field: "transactionStatus",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <StatusChip status={data.transactionStatus} /> : null,
  },
  {
    headerName: "Created At",
    field: "createdAt",
    sortable: true,
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    filterParams: { buttons: ["reset", "apply"] },
    valueFormatter: ({ value }: ValueFormatterParams) =>
      value ? dateStringFormatter(value) : "",
  },
  {
    headerName: "Action",
    width: 100,
    pinned: "right",
    sortable: false,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? (
        <Button
          onClick={() => onViewClick(data)}
        >
          View
        </Button>
      ) : null,
  },
];
