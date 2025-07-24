/* eslint-disable @typescript-eslint/no-explicit-any */

import StatusChip from "@/components/status-chip";
import {
  dateStringFormatter,
  formatTransactionCode,
  PriceFormat,
} from "@/utils/format-helper";

export const transactionColumnDefs = [
  {
    headerName: "Transaction Code",
    field: "transactionCode",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: (params: any) => (
      <p>{formatTransactionCode(params.data.transactionCode)}</p>
    ),
  },
  {
    headerName: "Transaction Type",
    field: "transactionType",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "From Value",
    field: "fromValue",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: (params: any) => (
      <p>
        {PriceFormat(
          params.data.fromValue,
          params.data,
          params.data.fromCurrency === "QMGT" &&
            params.data.transactionType.toLowerCase() !== "buy",
          "fromValue"
        )}
      </p>
    ),
  },
  {
    headerName: "To Value",
    field: "toValue",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: (params: any) => (
      <p>
        {PriceFormat(
          params.data.toValue,
          params.data,
          params.data.fromCurrency === "QMGT" &&
            params.data.transactionType.toLowerCase() !== "buy",
          "toValue"
        )}
      </p>
    ),
  },
  {
    headerName: "Gold Price",
    field: "goldPrice",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: (params: any) => PriceFormat(params.data.goldPrice),
  },
  {
    headerName: "USDT Rate",
    field: "usdRate",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: (params: any) => PriceFormat(params.data.usdRate),
  },
  {
    headerName: "Status",
    field: "transactionStatus",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: (params: any) => (
      <StatusChip status={params.data.transactionStatus} />
    ),
  },
  {
    headerName: "Created At",
    field: "createdAt",
    sortable: true,
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    filterParams: { buttons: ["reset", "apply"] },
    valueFormatter: (params: any) => dateStringFormatter(params.value),
  },
];
