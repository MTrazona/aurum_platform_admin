/* eslint-disable @typescript-eslint/no-explicit-any */

import { formatTransactionCode, PriceFormat } from "@/utils/format-helper";

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
          (params.data.fromCurrency === "QMGT" && params.data.transactionType.toLowerCase() !== 'buy') ||
            params.data.toCurrency === "QMGT",
          "fromValue"
        )}
      </p>
    ),
  },
  { headerName: "To Value", field: "toValue" },
  { headerName: "Gold Price", field: "goldPrice" },
  { headerName: "USDT Rate", field: "usdRate" },
  { headerName: "Status", field: "transactionStatus" },
  {
    headerName: "Created At",
    field: "createdAt",
    valueFormatter: (params: any) => new Date(params.value).toLocaleString(),
  },
];
