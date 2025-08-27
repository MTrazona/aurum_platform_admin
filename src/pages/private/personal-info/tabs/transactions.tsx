/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useMemo, useState } from "react";
import CustomDataTable from "@/components/custom-data-table";
import { PriceFormat, dateStringFormatter, formatTransactionCode } from "@/utils/format-helper";
import type { PersonalInfo, Transaction } from "@/types/personalinfo";
import { TransactionTransactionType } from "@/types/personalinfo";
import type { ColDef, ICellRendererParams, ValueFormatterParams } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import {
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  Coins,
  ArrowDownRight,
  ArrowUpRight,
  TrendingUp,
  Zap,
  Globe2,
  Shuffle,
} from "lucide-react";

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
    cellRenderer: ({ data }: ICellRendererParams<Transaction>) =>
      data ? PriceFormat(data.goldPrice as unknown as string) : null,
  },
  {
    headerName: "USDT Rate",
    field: "usdRate",
    sortable: true,
    filter: "agNumberColumnFilter",
    filterParams: { buttons: ["reset", "apply"] },
    cellRenderer: ({ data }: ICellRendererParams<Transaction>) =>
      data ? PriceFormat(data.usdRate as unknown as string) : null,
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
    valueFormatter: ({ value }: ValueFormatterParams) =>
      value ? dateStringFormatter(value as string) : "",
  },
];

const TITLE_LABELS: Record<TransactionTransactionType, string> = {
  [TransactionTransactionType.Buy]: "Buy",
  [TransactionTransactionType.Sell]: "Sell",
  [TransactionTransactionType.Gae]: "GAE",
  [TransactionTransactionType.GaePh]: "GAE PH",
  [TransactionTransactionType.GAEExtra]: "GAE EXTRA",
  [TransactionTransactionType.GoldConvert]: "Gold Convert",
  [TransactionTransactionType.SwapQMGTUSDAU]: "Swap QMGT ⇄ USDAU",
};

const ICONS: Record<TransactionTransactionType, React.ReactNode> = {
  [TransactionTransactionType.Buy]: <ArrowDownRight className="h-4 w-4" />,
  [TransactionTransactionType.Sell]: <ArrowUpRight className="h-4 w-4" />,
  [TransactionTransactionType.Gae]: <TrendingUp className="h-4 w-4" />,
  [TransactionTransactionType.GAEExtra]: <Zap className="h-4 w-4" />,
  [TransactionTransactionType.GaePh]: <Globe2 className="h-4 w-4" />,
  [TransactionTransactionType.GoldConvert]: <RefreshCcw className="h-4 w-4" />,
  [TransactionTransactionType.SwapQMGTUSDAU]: <Shuffle className="h-4 w-4" />,
};

const SUBTITLE_FOR = (count: number) =>
  count > 1 ? `${count} transactions` : `${count} transaction`;

const SkeletonTile = () => (
  <div
    className={[
      "rounded-2xl px-4 py-3.5",
      "bg-[#1E1E20] border border-[color:var(--border)]",
      "animate-pulse",
    ].join(" ")}
  >
    <div className="flex items-center gap-3">
      <span className="h-9 w-9 rounded-full bg-white/10" />
      <div className="flex-1">
        <div className="h-4 w-36 rounded bg-white/10" />
        <div className="mt-2 h-3 w-24 rounded bg-white/10" />
      </div>
      <div className="h-5 w-10 rounded-full bg-white/10" />
    </div>
  </div>
);

const TransactionsTab: React.FC<TransactionsTabProps> = ({ transactions, loading = false }) => {
  const rows = (transactions || []) as unknown as Transaction[];

  const [selectedType, setSelectedType] = useState<TransactionTransactionType | "all">("all");
  const [showTable, setShowTable] = useState(false);

  const countsByType = useMemo(() => {
    const counts: Partial<Record<TransactionTransactionType, number>> = {};
    for (const tx of rows) {
      const type = tx.transactionType as TransactionTransactionType;
      counts[type] = (counts[type] || 0) + 1;
    }
    return counts;
  }, [rows]);

  const totalCount = rows.length;

  const availableTypes = useMemo(
    () => (Object.keys(countsByType) as TransactionTransactionType[]).sort(),
    [countsByType]
  );

  const filteredRows = useMemo(() => {
    if (selectedType === "all") return rows;
    return rows.filter((tx) => tx.transactionType === selectedType);
  }, [rows, selectedType]);

  return (
    <div className="space-y-5">
      {!showTable ? (
        <>
          {/* Section header with glow */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-golden">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-golden/10 ring-1 ring-golden/40">
                <RefreshCcw className="h-4 w-4" />
              </span>
              <h2 className="text-[15px] font-semibold">Transactions</h2>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer border-golden text-golden hover:bg-golden hover:text-foreground"
              onClick={() => {
                setSelectedType("all");
                setShowTable(true);
              }}
            >
              Show all ({totalCount})
            </Button>
          </div>

          {/* Stats strip */}
          <div
            className={[
              "rounded-xl px-3 py-2",
              "bg-[#1E1E20] border border-[color:var(--border)]",
              "text-[12px] text-white",
              "flex items-center gap-3",
            ].join(" ")}
          >
            <span className="inline-flex items-center gap-1">
              <Coins className="h-3.5 w-3.5 text-golden" />
              <span className="font-medium">{totalCount}</span> total
            </span>
            <span className="h-3 w-px bg-foreground/10" />
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-golden/80" />
              {availableTypes.length} types
            </span>
          </div>

          {/* Tile list */}
          <div className="space-y-3">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonTile key={i} />)
              : availableTypes.map((type) => {
                  const count = countsByType[type] ?? 0;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedType(type);
                        setShowTable(true);
                      }}
                      className={[
                        "group w-full text-left text-white rounded-2xl px-4 py-3.5",
                        "bg-[#1E1E20] text-foreground shadow-sm",
                        "border border-[color:var(--border)]",
                        "transition-all hover:bg-[#232325] active:opacity-90",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-golden/60 focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={[
                            "inline-flex h-9 w-9 items-center justify-center rounded-full",
                            "bg-golden/10 text-golden ring-1 ring-golden/40",
                            "transition-transform group-active:scale-[0.98]",
                          ].join(" ")}
                        >
                          {ICONS[type]}
                        </span>

                        <div className="flex-1">
                          <div className="text-[15px] font-semibold leading-tight">{TITLE_LABELS[type]}</div>
                          <div className="mt-0.5 text-[12px] ">{SUBTITLE_FOR(count)}</div>
                        </div>

                        <div className="ml-2 flex items-center gap-2">
                          <span className="rounded-full bg-golden/15 text-golden text-[11px] px-2 py-1 font-medium ring-1 ring-golden/30">
                            {count}
                          </span>
                          <ChevronRight className="h-4 w-4 text-foreground/60 group-hover:text-golden transition-colors" />
                        </div>
                      </div>
                    </button>
                  );
                })}
          </div>
        </>
      ) : (
        <>
          {/* Table toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer border-golden text-golden hover:bg-golden hover:text-foreground"
                onClick={() => setShowTable(false)}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
              <div className="text-sm text-muted-foreground">
                Showing:{" "}
                <span className="font-medium text-golden">
                  {selectedType === "all"
                    ? "All types"
                    : TITLE_LABELS[selectedType as TransactionTransactionType]}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer border-border"
              onClick={() => setSelectedType("all")}
            >
              Clear filter
            </Button>
          </div>

          <CustomDataTable columnDefs={columnDefs} rowData={filteredRows} loading={loading} />
        </>
      )}
    </div>
  );
};

export default TransactionsTab;
