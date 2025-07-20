/* eslint-disable @typescript-eslint/no-explicit-any */

import StatusChip from "@/components/status-chip";
import { dateStringFormatter, formatTransactionCode, PriceFormat } from "@/utils/format-helper";

// column-defs/transaction-column-defs.ts
export const transactionColumnDefs = [
  {
    headerName: "Transaction Code",
    field: "transactionCode",
    cellRenderer: (params: any) => (
      <p>{formatTransactionCode(params.data.transactionCode)}</p>
    ),
  },
  { headerName: "Transaction Type", field: "transactionType" },
  {
    headerName: "From Value",
    field: "fromValue",
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
    cellRenderer: (params: any) => PriceFormat(params.data.goldPrice),
  },
  {
    headerName: "USDT Rate",
    field: "usdRate",
    cellRenderer: (params: any) => PriceFormat(params.data.goldPrice),
  },
  { headerName: "Status", field: "transactionStatus",cellRenderer:(params:any) =><StatusChip status={params.data.transactionStatus} /> },
  {
    headerName: "Created At",
    field: "createdAt",
    valueFormatter: (params: any) => dateStringFormatter(params.value),
  },
];
