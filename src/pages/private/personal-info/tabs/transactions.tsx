/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import CustomDataTable from "@/components/custom-data-table";
import { PriceFormat, dateStringFormatter, formatTransactionCode } from "@/utils/format-helper";
import type { PersonalInfo, Transaction } from "@/types/personalinfo";
import type { ColDef, ICellRendererParams, ValueFormatterParams } from "ag-grid-community";

type TransactionsTabProps = {
  transactions: PersonalInfo["transactions"];
  loading?: boolean;
};

const columnDefs: ColDef<Transaction>[] = [
  {
    headerName: "Transaction Code",
    field: "transactionCode",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<Transaction>) =>
      data ? <p>{formatTransactionCode(data.transactionCode)}</p> : null,
  },
  {
    headerName: "Transaction Type",
    field: "transactionType",
    minWidth: 150,
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Paid Amount",
    field: "fromValue",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<Transaction>) =>
      data ? (
        <p>
          {PriceFormat(
            data.fromValue as unknown as string,
            data as unknown as any,
            data.fromCurrency === "QMGT" && data.transactionType.toLowerCase() !== "buy",
            "fromValue" as any
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
    cellRenderer: ({ data }: ICellRendererParams<Transaction>) =>
      data ? (
        <p>
          {PriceFormat(
            data.toValue as unknown as string,
            data as unknown as any,
            data.toCurrency === "QMGT" && data.transactionType.toLowerCase() !== "buy",
            "toValue" as any
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
    cellRenderer: ({ data }: ICellRendererParams<Transaction>) => (data ? PriceFormat(data.goldPrice as unknown as string) : null),
  },
  {
    headerName: "USDT Rate",
    field: "usdRate",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<Transaction>) => (data ? PriceFormat(data.usdRate as unknown as string) : null),
  },
  {
    headerName: "Status",
    field: "transactionStatus",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Created At",
    field: "createdAt",
    sortable: true,
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    filterParams: { buttons: ["reset", "apply"] },
    valueFormatter: ({ value }: ValueFormatterParams) => (value ? dateStringFormatter(value as string) : ""),
  },
];

const TransactionsTab: React.FC<TransactionsTabProps> = ({ transactions, loading = false }) => {
  const rows = (transactions || []) as unknown as Transaction[];
  return (
    <div className="space-y-4">
      <CustomDataTable columnDefs={columnDefs} rowData={rows} loading={loading} />
    </div>
  );
};

export default TransactionsTab;

