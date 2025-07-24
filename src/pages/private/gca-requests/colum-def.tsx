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

export const gcaRequestColumnDefs = (onView: (row: TransactionsType) => void) => [
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
    headerName: "Amount Deposited",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `₱ ${data.fromValue}`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <PHPDisplay value={data.fromValue} />
    ),
  },
  {
    headerName: "Currency Fund",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `₱ ${data.toValue}`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <PHPDisplay value={data.toValue} />
    ),
  },
  {
    headerName: "Transaction Fee",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `₱ ${data.transactionFee}`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <PHPDisplay value={data.transactionFee} />
    ),
  },
  {
    headerName: "Amount to Receive",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    tooltipValueGetter: ({ data }: { data: TransactionsType }) =>
      `${data.toValue} QMGT`,
    cellRenderer: ({ data }: { data: TransactionsType }) => (
      <QMGTDisplay value={data.toValue} />
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
