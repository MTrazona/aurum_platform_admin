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
  ValueFormatterParams,
  ITooltipParams,
} from "ag-grid-community";

export const gaeRequestColumnDefs = (
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
    headerName: "Transaction Type",
    field: "transactionType",
    hide: true,
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
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
    headerName: "Unit bought",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? (
        <p>
          {data.fromValue} {Number(data.fromValue) > 1 ? "Units" : "Unit"}
        </p>
      ) : null,
  },
  {
    headerName: "Unit Total Value",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <USDTDisplay value={Number(data.toValue ?? 0)} /> : null,
  },
  {
    headerName: "Down Payment",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `₱ ${Number(data?.gaeDownPayment ?? 0) * Number(data?.usdRate ?? 0)}`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? (
        <PHPDisplay
          value={Number(data.gaeDownPayment ?? 0) * Number(data.usdRate ?? 0)}
        />
      ) : null,
  },
  {
    headerName: "Management Fee",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `₱ ${Number(data?.managementFeeAdvance ?? 0) * Number(data?.usdRate ?? 0)}`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? (
        <PHPDisplay
          value={
            Number(data.managementFeeAdvance ?? 0) *
            Number(data.usdRate ?? 0)
          }
        />
      ) : null,
  },
  {
    headerName: "Amount Deposited",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `₱ ${Number(data?.gaeTotal ?? 0) * Number(data?.usdRate ?? 0)}`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? (
        <PHPDisplay
          value={Number(data.gaeTotal ?? 0) * Number(data.usdRate ?? 0)}
        />
      ) : null,
  },
  {
    headerName: "Transaction Fee",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `₱ ${Number(data?.transactionFee ?? 0) * Number(data?.usdRate ?? 0)}`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? (
        <PHPDisplay
          value={
            Number(data.transactionFee ?? 0) * Number(data.usdRate ?? 0)
          }
        />
      ) : null,
  },
  {
    headerName: "Amount to Receive",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `${data?.bookingNote ?? 0} QMGT`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <QMGTDisplay value={data.bookingNote ?? 0} /> : null,
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
    field: "usdRate",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: ITooltipParams<TransactionsType>) =>
      `${data?.usdRate} USDT`,
    cellRenderer: ({ data }: ICellRendererParams<TransactionsType>) =>
      data ? <USDTDisplay value={data.usdRate} /> : null,
  },
  {
    headerName: "Tracking Number",
    field: "referenceNumberAdmin",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
  },
  {
    headerName: "Transaction Status",
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
