import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useExtractReference } from "@/hooks/use-extract-reference";
import type { TransactionsType } from "@/types/buy-request.types";
import { formatNumber } from "@/utils/format-helper";
import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CustomTextEditor from "../custom-editor";
import {
  ConversionDisplay,
  GAEDisplay,
  PHPDisplay,
  QMGTDisplay,
} from "../features/price-display";
import { ZoomControls } from "../features/zoom-controls";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import RejectReasonDialog from "./reject-bank-request";

interface Props {
  data: TransactionsType;
  open: boolean;
  onClose: () => void;
  onRemarks: (
    id: number | string,
    remarks: string,
    remarksstatus: string[]
  ) => void;
  onUpdate?: (
    id: number,
    narrative: string,
    transactionStatus: string,
    depositamount: number,
    rejectReason?: string
  ) => void;
  isApproving?: boolean;
  isRejecting?: boolean;
  isRemarking?: boolean;
}

const remarkOptions = ["On Hold", "Third Party", "Others"];

const GAERequestDetailsModal: React.FC<Props> = ({
  data,
  open,
  onClose,
  onUpdate,
  onRemarks,
  isApproving,
  isRemarking,
  isRejecting,
}) => {
  const [confirming, setConfirming] = useState<"approve" | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [narrative, setNarrative] = useState("");
  const [remarks, setRemarks] = useState(data?.remarks ?? "");
  const [remarkTags, setRemarkTags] = useState<string[]>([]);
  const [depositAmountInput, setDepositAmountInput] = useState<number>(0);
  const { extractedReference, referenceMatch } = useExtractReference(
    data?.receiptImageLinkUser,
    data?.referenceNumberUser
  );

  const handleRejectConfirmed = (reason: string, other?: string) => {
    onUpdate?.(data.id, narrative, "Rejected", 0, reason ?? other);
    setShowRejectDialog(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[65vw] min-w-[65vw] rounded-lg !bg-[#171717] text-white flex flex-col overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 max-h-[75vh] overflow-y-auto p-8">
          <div className="flex-1 space-y-4">
            {referenceMatch === "loading" && (
              <p className="text-sm text-yellow-400 italic">
                Checking reference number...
              </p>
            )}
            {referenceMatch === "matched" && (
              <p className="text-sm text-green-400 font-semibold">
                Reference number matched:{" "}
                <span className="underline">{extractedReference}</span>
              </p>
            )}
            {referenceMatch === "not-matched" && (
              <p className="text-sm text-red-400 font-semibold">
                Reference number mismatch. Found:{" "}
                <span className="underline">{extractedReference}</span>
              </p>
            )}

            {data.receiptImageLinkUser ? (
              <div className="relative border rounded h-auto bg-black overflow-hidden">
                <TransformWrapper>
                  <ZoomControls />
                  <TransformComponent>
                    <img
                      src={data.receiptImageLinkUser}
                      alt="Receipt"
                      className="w-full h-full object-contain"
                    />
                  </TransformComponent>
                </TransformWrapper>
              </div>
            ) : (
              <div className="text-gray-400 italic border rounded p-4 h-[400px] flex items-center justify-center">
                No receipt uploaded
              </div>
            )}
          </div>
          <div className="flex-[0.5] mt-[34px]">
            <div className="space-y-6 bg-[#1E1E1E] p-6 rounded-xl border border-[#3A3A3A]">
              {/* Section Title */}
              <h2 className="text-lg font-bold text-golden">Payment Summary</h2>

              <div className="grid grid-cols-1 gap-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Paid Amount:</span>
                  <PHPDisplay value={data.fromValue} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Transaction Fee:</span>
                  <PHPDisplay value={data.transactionFee} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Currency Fund:</span>
                  <PHPDisplay value={data.toValue} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total Buy Units:</span>
                  <GAEDisplay value={data.fromValue} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Total QMGT Holdings:</span>
                  <QMGTDisplay value={data.bookingNote ?? 0} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Down Payment:</span>
                  <ConversionDisplay
                    currency="PHP"
                    fromValue={data.gaeDownPayment ?? 0}
                    rate={data.usdRate ?? 0}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Management Fee:</span>
                  <ConversionDisplay
                    currency="PHP"
                    fromValue={data.managementFeeAdvance ?? 0}
                    rate={data.usdRate ?? 0}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#3A3A3A] my-2"></div>

              {/* Bank Info Section */}
              <h2 className="text-lg font-bold text-golden">Bank Info</h2>

              <div className="grid grid-cols-1 gap-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Bank Name:</span>
                  <span className="font-medium text-white">
                    {data.bankCustomer?.bankName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Account Number:</span>
                  <span className="font-medium text-white">
                    {data.bankCustomer?.accountNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Account Holder Name:</span>
                  <span className="font-medium text-white">
                    {data.bankCustomer?.accountHolderName}
                  </span>
                </div>

                {data.rejectReason && (
                  <div className="pt-2">
                    <span className="text-red-400 text-sm font-medium">
                      Rejection Reason: {data.rejectReasonOthers}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3">
              <h1 className="text-sm text-gray-300 font-normal mb-2">
                Deposit Amount (PHP)
              </h1>
              <Input
                type="number"
                placeholder="Enter deposit amount"
                value={depositAmountInput}
                className="text-black"
                onChange={(e) => {
                  const value = e.target.value;
                  setDepositAmountInput(value === "" ? 0 : parseFloat(value));
                }}
              />
              <div className="mt-2 text-sm flex items-center gap-2">
                <p className="text-gray-300">Expected:</p>
                <PHPDisplay
                  value={Number(data.gaeTotal ?? 0) * Number(data.usdRate ?? 0)}
                />
              </div>
              <div className="text-sm flex items-center gap-2">
                <p className="text-gray-300">Change in USDAU:</p>
                {typeof depositAmountInput === "number" ? (
                  <p>
                    USDAU{" "}
                    {formatNumber(
                      depositAmountInput / Number(data.usdRate) -
                        Number(data.gaeTotal ?? 0) +
                        Number(data.transactionFee)
                    )}
                  </p>
                ) : (
                  "--"
                )}
              </div>
            </div>
            <div className="mt-2">
              <h1 className="text-sm font-medium mb-2">Narrative</h1>
              <CustomTextEditor value={narrative} onChange={setNarrative} />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="destructive"
                onClick={() => setShowRejectDialog(true)}
                disabled={isRejecting}
                className="flex-1"
              >
                Reject
              </Button>
              <Button
                onClick={() => setConfirming("approve")}
                disabled={isApproving}
                className="flex-1 bg-golden"
              >
                Approve
              </Button>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-sm font-medium">Remarks</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  {remarkOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={remarkTags.includes(option)}
                        onCheckedChange={(checked) => {
                          setRemarkTags((prev) =>
                            checked
                              ? [...prev, option]
                              : prev.filter((tag) => tag !== option)
                          );
                        }}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <CustomTextEditor
                classes="border-0"
                value={remarks}
                onChange={setRemarks}
              />
              <Button
                onClick={() => onRemarks(data.id, remarks, remarkTags)}
                disabled={isRemarking}
                className="mt-4 w-full bg-golden"
              >
                {isRemarking ? "Updating..." : "Update Remarks"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Approve confirmation */}
      <Dialog open={!!confirming} onOpenChange={() => setConfirming(null)}>
        <DialogContent className="max-w-md p-6 space-y-4">
          <DialogTitle>Confirm Approval</DialogTitle>
          <p className="text-sm text-gray-600">
            Please confirm that you have fully reviewed and validated the
            attached receipt. Approving this request will finalize the
            customer's deposit.
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setConfirming(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (confirming === "approve")
                  onUpdate?.(data.id, narrative, "Open", depositAmountInput);
              }}
              disabled={isApproving}
            >
              {isApproving ? "Approving..." : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <RejectReasonDialog
        open={showRejectDialog}
        onCancel={() => setShowRejectDialog(false)}
        onConfirm={handleRejectConfirmed}
        isRejecting={isRejecting ?? false}
      />
    </Dialog>
  );
};

export default GAERequestDetailsModal;
