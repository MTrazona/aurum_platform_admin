/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { USDAUTransactions } from "@/types/usdau-request.types";
import { dateStringFormatter } from "@/utils/format-helper";
import { iconSetQuartzLight, themeQuartz } from "ag-grid-community";
import CustomDataTable from "../custom-data-table";

type USDAURequestModalProps = {
  isOpen: boolean;
  data: USDAUTransactions;
  onClose: () => void;
  onApprove?: () => Promise<void>;
  onReject?: () => Promise<void>;
  isApproving: boolean;
  isRejecting: boolean;
};

export function USDAURequestModal({
  isOpen,
  data,
  onClose,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}: USDAURequestModalProps) {
  const [confirmAction, setConfirmAction] = useState<"approve" | "reject" | null>(null);

  const histories = data.usdauWallet?.usdau_histories ?? [];

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Amount",
        field: "amountTransaction",
        cellRenderer: (params: any) => {
          const rawValue = params.value ?? "0";
          const isPositive = rawValue.toString().startsWith("+");
          const isNegative = rawValue.toString().startsWith("-");

          const numericValue = Math.abs(parseFloat(rawValue.toString().replace(/[^\d.-]/g, "")));
          const formatted = numericValue.toLocaleString(undefined, { minimumFractionDigits: 2 });

          const displaySymbol = isPositive ? "+" : isNegative ? "–" : "";
          const tailwindClass = isPositive
            ? "text-green-500 font-semibold"
            : isNegative
            ? "text-red-500 font-semibold"
            : "text-gray-700";

          return <span className={tailwindClass}>{displaySymbol} {formatted}</span>;
        },
      },
      {
        headerName: "Date",
        field: "date",
        valueFormatter: (params: any) => dateStringFormatter(params.value),
      },
      {
        headerName: "Previous Balance",
        field: "previousBalance",
        valueFormatter: (params: any) => `$${params.value}`,
      },
      {
        headerName: "Ending Balance",
        field: "endingBalance",
        valueFormatter: (params: any) => `$${params.value}`,
      },
      {
        headerName: "Description",
        field: "description",
        flex: 1,
        cellStyle: { whiteSpace: "normal", lineHeight: "1.2rem" },
      },
    ],
    []
  );

  const myTheme = themeQuartz.withPart(iconSetQuartzLight).withParams({
    backgroundColor: "#ffffff",
    browserColorScheme: "light",
    columnBorder: false,
    fontFamily: "Arial",
    foregroundColor: "rgb(46, 55, 66)",
    headerBackgroundColor: "#DCA955",
    headerFontSize: 14,
    headerFontWeight: 600,
    headerTextColor: "#262424",
    oddRowBackgroundColor: "#FACB80",
    rowBorder: false,
    sidePanelBorder: false,
    spacing: 8,
    wrapperBorder: false,
    wrapperBorderRadius: 0,
  });

  if (!isOpen) return null;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            USDAU Request Details
          </DialogTitle>
        </DialogHeader>

        {/* Info Section */}
        <div className="bg-white/90">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Info label="Amount Requested" value={`USDT ${data.amountRequest}`} />
            <Info label="Date Requested" value={dateStringFormatter(data.dateRequest)} />
            <Info label="Fee" value={`USDT ${data.fee}`} />
            <Info label="From Value" value={`USDT ${data.fromValue}`} />
            <Info label="Wallet Address" value={data.walletAddress} mono full />
            <Info label="Customer Email" value={data.customer?.email} />
            <Info label="Document ID" value={data.documentId} mono />
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-primary mb-2">USDAU Histories</h3>
          {histories.length === 0 ? (
            <p className="text-sm text-muted-foreground">No USDAU transaction history found.</p>
          ) : (
            <div className="rounded-md border bg-white shadow-sm">
              <CustomDataTable
                columnDefs={columnDefs}
                rowData={histories.map((h) => ({
                  ...h,
                  amountTransaction: h.amountTransaction ?? 0,
                  previousBalance: h.previousBalance ?? "—",
                  endingBalance: h.endingBalance ?? "—",
                  description: h.description ?? "—",
                }))}
                paginationPageSize={20}
                className="ag-theme-quartz"
                customTheme={myTheme}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="sm:justify-between pt-6 flex flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button type="button" onClick={onClose} variant="secondary">
              Close
            </Button>
          </DialogClose>

          <AlertDialog>
            <div className="flex gap-2">
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  onClick={() => setConfirmAction("approve")}
                  disabled={isApproving}
                  className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                >
                  {isApproving ? "Approving..." : "Approve"}
                </Button>
              </AlertDialogTrigger>

              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  onClick={() => setConfirmAction("reject")}
                  disabled={isRejecting}
                  className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                >
                  {isRejecting ? "Rejecting..." : "Reject"}
                </Button>
              </AlertDialogTrigger>
            </div>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {confirmAction === "approve" ? "Confirm Approval" : "Confirm Rejection"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to <strong>{confirmAction?.toUpperCase()}</strong> this
                  request? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setConfirmAction(null)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={isApproving || isRejecting}
                  onClick={async () => {
                    if (confirmAction === "approve" && onApprove) await onApprove();
                    if (confirmAction === "reject" && onReject) await onReject();
                    setConfirmAction(null);
                  }}
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Reusable field for info display
const Info = ({
  label,
  value,
  mono = false,
  full = false,
}: {
  label: string;
  value?: string;
  mono?: boolean;
  full?: boolean;
}) => (
  <div className={full ? "sm:col-span-2" : ""}>
    <Label className="text-xs text-muted-foreground">{label}</Label>
    <p className={`text-sm ${mono ? "font-mono break-all" : ""}`}>{value ?? "—"}</p>
  </div>
);
