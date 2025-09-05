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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { USDAUTransactions } from "@/types/usdau-request.types";
import { dateStringFormatter } from "@/utils/format-helper";
import { iconSetQuartzLight, themeQuartz } from "ag-grid-community";
import CustomDataTable from "../custom-data-table";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  DollarSign, 
  Wallet, 
  User, 
  FileText, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  Copy
} from "lucide-react";

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
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const histories = data.usdauWallet?.usdau_histories ?? [];

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Helper function to copy to clipboard
  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

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
      <DialogContent className="max-w-[90vw] min-w-[90vw] lg:max-w-[80vw] lg:min-w-[80vw] max-h-[95vh] rounded-xl !bg-[#171717] text-white flex flex-col overflow-hidden border border-[#3A3A3A]">
        <DialogHeader className="pb-4 border-b border-[#3A3A3A]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#f89004]/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-[#f89004]" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                  USDAU Request Details
                </DialogTitle>
                <p className="text-sm text-gray-400 mt-1">
                  Transaction ID: {data.trans_id}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(data.requestStatus)}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Information Card */}
            <div className="lg:col-span-2 space-y-6">
              {/* Request Summary */}
              <Card className="bg-[#1E1E1E] border-[#3A3A3A]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#f89004] flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Request Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EnhancedInfo 
                      label="Amount Requested" 
                      value={`USDT ${data.amountRequest}`} 
                      icon={<DollarSign className="w-4 h-4" />}
                      highlight
                    />
                    <EnhancedInfo 
                      label="Date Requested" 
                      value={dateStringFormatter(data.dateRequest)} 
                      icon={<Calendar className="w-4 h-4" />}
                    />
                    <EnhancedInfo 
                      label="Fee" 
                      value={`USDT ${data.fee}`} 
                      icon={<DollarSign className="w-4 h-4" />}
                    />
                    <EnhancedInfo 
                      label="From Value" 
                      value={`USDT ${data.fromValue}`} 
                      icon={<TrendingUp className="w-4 h-4" />}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Customer & Wallet Information */}
              <Card className="bg-[#1E1E1E] border-[#3A3A3A]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#f89004] flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer & Wallet Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <EnhancedInfo 
                    label="Customer Email" 
                    value={data.customer?.email} 
                    icon={<User className="w-4 h-4" />}
                    copyable
                    onCopy={() => copyToClipboard(data.customer?.email || '', 'email')}
                    copied={copiedField === 'email'}
                  />
                  <EnhancedInfo 
                    label="Wallet Address" 
                    value={data.walletAddress} 
                    icon={<Wallet className="w-4 h-4" />}
                    mono 
                    full 
                    copyable
                    onCopy={() => copyToClipboard(data.walletAddress, 'wallet')}
                    copied={copiedField === 'wallet'}
                  />
                  <EnhancedInfo 
                    label="Document ID" 
                    value={data.documentId} 
                    icon={<FileText className="w-4 h-4" />}
                    mono
                    copyable
                    onCopy={() => copyToClipboard(data.documentId, 'document')}
                    copied={copiedField === 'document'}
                  />
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card className="bg-[#1E1E1E] border-[#3A3A3A]">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#f89004] flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    USDAU Transaction History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {histories.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-400">No USDAU transaction history found.</p>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-[#3A3A3A] bg-[#0F0F0F] overflow-hidden">
                      <CustomDataTable
                        columnDefs={columnDefs}
                        rowData={histories.map((h) => ({
                          ...h,
                          amountTransaction: h.amountTransaction ?? 0,
                          previousBalance: h.previousBalance ?? "—",
                          endingBalance: h.endingBalance ?? "—",
                          description: h.description ?? "—",
                        }))}
                        paginationPageSize={10}
                        className="ag-theme-quartz"
                        customTheme={myTheme}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Quick Actions & Stats */}
            <div className="space-y-6">
              {/* Current Balance */}
              <Card className="bg-gradient-to-br from-[#f89004]/10 to-[#f89004]/5 border-[#f89004]/20">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="p-3 bg-[#f89004]/20 rounded-full w-fit mx-auto mb-3">
                      <Wallet className="w-6 h-6 text-[#f89004]" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-300 mb-1">Current Balance</h3>
                    <p className="text-2xl font-bold text-white">
                      ${data.usdauWallet?.balance || '0.00'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">USDAU Wallet</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-[#1E1E1E] border-[#3A3A3A]">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-gray-300">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Total Transactions</span>
                    <span className="text-sm font-semibold text-white">{histories.length}</span>
                  </div>
                  <Separator className="bg-[#3A3A3A]" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Request Amount</span>
                    <span className="text-sm font-semibold text-[#f89004]">${data.amountRequest}</span>
                  </div>
                  <Separator className="bg-[#3A3A3A]" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Processing Fee</span>
                    <span className="text-sm font-semibold text-red-400">${data.fee}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="bg-[#1E1E1E] border-[#3A3A3A]">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold text-gray-300">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        onClick={() => setConfirmAction("approve")}
                        disabled={isApproving || data.requestStatus.toLowerCase() !== 'pending'}
                        className="w-full bg-green-600 hover:bg-green-700 text-white cursor-pointer disabled:opacity-50"
                      >
                        {isApproving ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Approving...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve Request
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        onClick={() => setConfirmAction("reject")}
                        disabled={isRejecting || data.requestStatus.toLowerCase() !== 'pending'}
                        variant="destructive"
                        className="w-full"
                      >
                        {isRejecting ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Rejecting...
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject Request
                          </>
                        )}
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="bg-[#1E1E1E] border-[#3A3A3A] text-white">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          {confirmAction === "approve" ? (
                            <>
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              Confirm Approval
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-red-500" />
                              Confirm Rejection
                            </>
                          )}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                          Are you sure you want to <strong className="text-white">{confirmAction?.toUpperCase()}</strong> this
                          request? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel 
                          onClick={() => setConfirmAction(null)}
                          className="bg-[#3A3A3A] text-white border-[#3A3A3A] hover:bg-[#4A4A4A]"
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          disabled={isApproving || isRejecting}
                          onClick={async () => {
                            if (confirmAction === "approve" && onApprove) await onApprove();
                            if (confirmAction === "reject" && onReject) await onReject();
                            setConfirmAction(null);
                          }}
                          className={confirmAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
                        >
                          Confirm {confirmAction === "approve" ? "Approval" : "Rejection"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="pt-4 border-t border-[#3A3A3A] bg-[#1E1E1E]">
          <DialogClose asChild>
            <Button 
              type="button" 
              onClick={onClose} 
              variant="secondary"
              className="bg-[#3A3A3A] text-white border-[#3A3A3A] hover:bg-[#4A4A4A]"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Enhanced info component with icons and copy functionality
const EnhancedInfo = ({
  label,
  value,
  icon,
  mono = false,
  full = false,
  highlight = false,
  copyable = false,
  onCopy,
  copied = false,
}: {
  label: string;
  value?: string;
  icon?: React.ReactNode;
  mono?: boolean;
  full?: boolean;
  highlight?: boolean;
  copyable?: boolean;
  onCopy?: () => void;
  copied?: boolean;
}) => (
  <div className={`space-y-2 ${full ? "md:col-span-2" : ""}`}>
    <div className="flex items-center gap-2">
      {icon && <span className="text-gray-400">{icon}</span>}
      <Label className="text-xs text-gray-400 font-medium">{label}</Label>
    </div>
    <div className="flex items-center gap-2">
      <p className={`text-sm ${mono ? "font-mono break-all" : ""} ${highlight ? "text-[#f89004] font-semibold" : "text-white"}`}>
        {value ?? "—"}
      </p>
      {copyable && value && (
        <Button
          size="sm"
          variant="ghost"
          onClick={onCopy}
          className="h-6 w-6 p-0 text-gray-400 hover:text-white"
        >
          {copied ? (
            <CheckCircle className="w-3 h-3 text-green-500" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </Button>
      )}
    </div>
  </div>
);
