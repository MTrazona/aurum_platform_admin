/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomDataTable from "@/components/custom-data-table";
import StatusChip from "@/components/status-chip";
import { TransactionsType } from "@/types/buy-request.types";
import type { Transaction } from "@/types/personalinfo";
import { dateStringFormatter, formatTransactionCode, PriceFormat } from "@/utils/format-helper";
import { ICellRendererParams, ValueFormatterParams } from "ag-grid-community";
import { useMemo } from "react";

interface Props {
  data: Transaction[] | undefined;
  loading?: boolean;
}

export default function TransactionsTab({ data = [], loading }: Props) {


  const cols = useMemo(
    () => [
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
              data.transactionType?.toLowerCase() !== "buy",
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
              data.transactionType?.toLowerCase() !== "buy",
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
    ],
    []
  );

  return <CustomDataTable className="mt-4" columnDefs={cols} rowData={data} loading={loading} paginationPageSize={10} />;
}
