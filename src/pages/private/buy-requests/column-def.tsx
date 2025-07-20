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

export const buyRequestColumnDefs = (onView: (row: TransactionsType) => void) => [
  {
    headerName: "Transaction Code",
    field: "transactionCode",
    tooltipField: "transactionCode",
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <p>{formatTransactionCode(data.transactionCode)}</p>
    ),
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
    headerName: "Amount Credited",
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `₱ ${data.depositedAmount}`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <PHPDisplay value={data.depositedAmount} />
    ),
  },
  {
    headerName: "Transaction Fee",
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `₱ ${data.transactionFee}`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <PHPDisplay value={data.transactionFee} />
    ),
  },
  {
    headerName: "Amount to Receive",
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `${data.toValue} QMGT`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <QMGTDisplay value={data.toValue} />
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
    headerName: "Status",
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
