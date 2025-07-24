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

export const gaeRequestColumnDefs = (
  onView: (row: TransactionsType) => void
) => [
  {
    headerName: "Transaction Code",
    field: "transactionCode",
    tooltipField: "transactionCode",
    sortable: true,
    filter: "agTextColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <p>{formatTransactionCode(data.transactionCode)}</p>
    ),
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
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `${data.customer?.firstName ?? "--"} ${data.customer?.lastName ?? "--"}`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <p>
        {data.customer?.firstName ?? "--"} {data.customer?.lastName ?? "--"}
      </p>
    ),
  },
  {
    headerName: "Unit bought",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <p>
        {data.fromValue} {Number(data.fromValue) > 1 ? "Units" : "Unit"}
      </p>
    ),
  },
  {
    headerName: "Unit Total Value",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <USDTDisplay value={Number(data.toValue ?? 0)} />
    ),
  },
  {
    headerName: "Down Payment",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `₱ ${Number(data.gaeDownPayment ?? 0) * Number(data.usdRate ?? 0)}`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <PHPDisplay
        value={Number(data.gaeDownPayment ?? 0) * Number(data.usdRate ?? 0)}
      />
    ),
  },
  {
    headerName: "Management Fee",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `₱ ${Number(data.managementFeeAdvance ?? 0) * Number(data.usdRate ?? 0)}`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <PHPDisplay
        value={
          Number(data.managementFeeAdvance ?? 0) * Number(data.usdRate ?? 0)
        }
      />
    ),
  },
  {
    headerName: "Amount Deposited",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `₱ ${Number(data.gaeTotal ?? 0) * Number(data.usdRate ?? 0)}`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <PHPDisplay
        value={Number(data.gaeTotal ?? 0) * Number(data.usdRate ?? 0)}
      />
    ),
  },
  {
    headerName: "Transaction Fee",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `₱ ${Number(data.transactionFee ?? 0) * Number(data.usdRate ?? 0)}`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <PHPDisplay
        value={Number(data.transactionFee ?? 0) * Number(data.usdRate ?? 0)}
      />
    ),
  },
  {
    headerName: "Amount to Receive",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `${data.bookingNote ?? 0} QMGT`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <QMGTDisplay value={data.bookingNote ?? 0} />
    ),
  },
  {
    headerName: "Gold Price",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `${data.goldPrice} USDT`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <USDTDisplay value={data.goldPrice} />
    ),
  },
  {
    headerName: "USDT Price",
    field: "usdRate",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `${data.usdRate} USDT`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <USDTDisplay value={data.usdRate} />
    ),
  },
  {
    headerName: "Tracking Number",
    field: "trackingNumber",
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
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <StatusChip status={data.transactionStatus} />
    ),
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
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      dateStringFormatter(data.trDate),
    valueFormatter: ({ data }: { data: TransactionsType }) =>
      dateStringFormatter(data.trDate),
  },
  {
    headerName: "Actions",
    width: 120,
    pinned: "right",
    sortable: false,
    filter: false,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <div className="flex justify-center items-center h-full w-full">
        <Button className="cursor-pointer" onClick={() => onView(data)}>
          View
        </Button>
      </div>
    ),
  },
];
