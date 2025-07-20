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
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <p>{formatTransactionCode(data.transactionCode)}</p>
    ),
  },
  {
    headerName: "Transaction Type",
    hide: true,
    field: "transactionType",
    filter: "agTextColumnFilter",
  },

  {
    headerName: "Customer",
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
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <p>
        {data.fromValue} {Number(data.fromValue) > 1 ? "Units" : "Unit"}
      </p>
    ),
  },
  {
    headerName: "Unit Total Value",
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <USDTDisplay value={Number(data.toValue ?? 0)} />
    ),
  },
  {
    headerName: "Down Payment",
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
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `${data.bookingNote ?? 0} QMGT`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <QMGTDisplay value={data.bookingNote ?? 0} />
    ),
  },
  {
    headerName: "Gold Price",
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `${data.goldPrice} USDT`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <USDTDisplay value={data.goldPrice} />
    ),
  },
  {
    headerName: "USDT Price",
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `${data.usdRate} USDT`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <USDTDisplay value={data.usdRate} />
    ),
  },
  {
    headerName: "Tracking Number",
    field: "transactionStatus",
  },
  {
    headerName: "Transaction Status",
    field: "transactionStatus",
    tooltipField: "transactionStatus",
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <StatusChip status={data.transactionStatus} />
    ),
  },
  {
    headerName: "Reference Number",
    field: "referenceNumberUser",
    tooltipField: "referenceNumberUser",
  },
  {
    headerName: "Created At",
    field: "createdAt",
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      dateStringFormatter(data.trDate),
    valueFormatter: ({ data }: { data: TransactionsType }) =>
      dateStringFormatter(data.trDate),
  },
  {
    headerName: "Actions",
    width: 120,
    pinned: "right",
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <div className="flex justify-center items-center h-full w-full">
        <Button className="cursor-pointer" onClick={() => onView(data)}>
          View
        </Button>
      </div>
    ),
  },
];
