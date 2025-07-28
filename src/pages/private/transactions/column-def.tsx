import type { ColDef, ICellRendererParams, ValueFormatterParams } from "ag-grid-community";
import TransactionTypeMultiSelectFilter from "@/components/features/transaction-type-filter";
import StatusChip from "@/components/status-chip";
import {
  dateStringFormatter,
  formatTransactionCode,
  PriceFormat,
} from "@/utils/format-helper";
import type { TransactionsType } from "@/types/buy-request.types";

export const transactionColumnDefs: ColDef<TransactionsType>[] = [
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
    filter: {
      component: TransactionTypeMultiSelectFilter,
      handler: "agTextColumnFilterHandler",
    },
    filterParams: {
      buttons: ["reset", "apply"],
      textCustomComparator: (filter: string, value: string) => {
        if (!filter || !value) return false;
        const selectedValues = filter
          .split("|")
          .map((v) => v.trim().toLowerCase());
        const rowValue = value.trim().toLowerCase();
        const isMatch = selectedValues.includes(rowValue);
        return isMatch;
      },
    },
  },
  {
    headerName: "From Value",
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
    headerName: "To Value",
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
            data.fromCurrency === "QMGT" &&
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
];
