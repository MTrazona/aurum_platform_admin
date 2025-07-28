import {
  PHPDisplay,
  QMGTDisplay,
  USDTDisplay,
} from "@/components/features/price-display";
import StatusChip from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import type { TransactionsType } from "@/types/buy-request.types";
import {
  dateStringFormatter,
  formatTransactionCode,
} from "@/utils/format-helper";
import type {
  ColDef,
  ICellRendererParams,
  ITooltipParams,
  ValueFormatterParams,
} from "ag-grid-community";

export const buyRequestColumnDefs = (
  onView: (row: TransactionsType) => void
): ColDef<TransactionsType>[] => [
  {
    headerName: "Transaction Code",
    field: "transactionCode",
    tooltipField: "transactionCode",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <p>{formatTransactionCode(data.transactionCode)}</p> : null,
  },
  {
    headerName: "Customer",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `${data?.customer?.firstName ?? "--"} ${data?.customer?.lastName ?? "--"}`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? (
        <p>
          {data.customer?.firstName ?? "--"} {data.customer?.lastName ?? "--"}
        </p>
      ) : null,
  },
  {
    headerName: "Amount Credited",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `₱ ${data?.depositedAmount}`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <PHPDisplay value={data.depositedAmount} /> : null,
  },
  {
    headerName: "Transaction Fee",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `₱ ${data?.transactionFee}`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <PHPDisplay value={data.transactionFee} /> : null,
  },
  {
    headerName: "Amount to Receive",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `${data?.toValue} QMGT`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <QMGTDisplay value={data.toValue} /> : null,
  },
  {
    headerName: "Gold Price",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `${data?.goldPrice} USDT`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <USDTDisplay value={data.goldPrice} /> : null,
  },
  {
    headerName: "USDT Price",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `${data?.usdRate} USDT`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <USDTDisplay value={data.usdRate} /> : null,
  },
  {
    headerName: "Status",
    field: "transactionStatus",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipField: "transactionStatus",
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <StatusChip status={data.transactionStatus} /> : null,
  },
  {
    headerName: "Reference Number",
    field: "referenceNumberUser",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipField: "referenceNumberUser",
  },
  {
    headerName: "Created At",
    field: "createdAt",
    sortable: true,
    filter: "agDateColumnFilter",
    cellDataType: "dateTime",
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      data?.trDate ? dateStringFormatter(data.trDate) : "",
    valueFormatter: ({ data }: ValueFormatterParams<TransactionsType>) =>
      data?.trDate ? dateStringFormatter(data.trDate) : "",
  },
  {
    headerName: "Actions",
    width: 120,
    pinned: "right",
    sortable: false,
    filter: false,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? (
        <div className="flex justify-center items-center h-full w-full">
          <Button className="cursor-pointer" onClick={() => onView(data)}>
            View
          </Button>
        </div>
      ) : null,
  },
];
