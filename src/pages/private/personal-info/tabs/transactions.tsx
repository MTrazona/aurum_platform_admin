/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useMemo, useState } from "react";
import CustomDataTable from "@/components/custom-data-table";
import { PriceFormat, dateStringFormatter, formatTransactionCode } from "@/utils/format-helper";
import type { PersonalInfo, Transaction } from "@/types/personalinfo";
import { TransactionTransactionType } from "@/types/personalinfo";
import type { ColDef, ICellRendererParams, ValueFormatterParams } from "ag-grid-community";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TransactionsTabProps = {
  transactions: PersonalInfo["transactions"];
  loading?: boolean;
};

const TYPE_DESCRIPTIONS: Record<TransactionTransactionType, string> = {
  [TransactionTransactionType.Buy]: "Purchase transactions converting currency to assets.",
  [TransactionTransactionType.Sell]: "Sales converting assets back to currency.",
  [TransactionTransactionType.Gae]: "Gold Accumulation Enrollment payments.",
  [TransactionTransactionType.GaePh]: "GAE Philippines program transactions.",
  [TransactionTransactionType.GAEExtra]: "Additional contributions to GAE.",
  [TransactionTransactionType.GoldConvert]: "Conversions between gold and tokens.",
  [TransactionTransactionType.SwapQMGTUSDAU]: "Swaps between QMGT and USDAU.",
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

  const [selectedType, setSelectedType] = useState<TransactionTransactionType | "all">("all");

  const countsByType = useMemo(() => {
    const counts: Partial<Record<TransactionTransactionType, number>> = {};
    for (const tx of rows) {
      const type = tx.transactionType as TransactionTransactionType;
      counts[type] = (counts[type] || 0) + 1;
    }
    return counts;
  }, [rows]);

  const availableTypes = useMemo(() => {
    return (Object.keys(countsByType) as TransactionTransactionType[]).sort();
  }, [countsByType]);

  const filteredRows = useMemo(() => {
    if (selectedType === "all") return rows;
    return rows.filter((tx) => tx.transactionType === selectedType);
  }, [rows, selectedType]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold">Transaction Types</h3>
        <div className="flex items-center gap-2">
          <Button
            variant={selectedType === "all" ? "default" : "outline"}
            size="sm"
            className="cursor-pointer"
            onClick={() => setSelectedType("all")}
          >
            Show all ({rows.length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 @5xl/main:grid-cols-4">
        {availableTypes.map((type) => (
          <Card
            key={type}
            className={`transition-colors ${selectedType === type ? "border-primary" : "hover:border-muted-foreground/40"} cursor-pointer`}
            onClick={() => setSelectedType(type)}
          >
            <CardHeader>
              <CardTitle className="text-sm">{type}</CardTitle>
              <CardDescription>
                {TYPE_DESCRIPTIONS[type] || "Transactions of this type."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{countsByType[type] ?? 0}</div>
              <div className="text-muted-foreground text-xs">Total transactions</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CustomDataTable columnDefs={columnDefs} rowData={filteredRows} loading={loading} />
    </div>
  );
};

export default TransactionsTab;

