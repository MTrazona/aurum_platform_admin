import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useExtractReference } from "@/hooks/use-extract-reference";
import type { TransactionsType } from "@/types/buy-request.types";
import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { PHPDisplay } from "../features/price-display";
import { ZoomControls } from "../features/zoom-controls";
import RejectReasonDialog from "./reject-bank-request";

interface Props {
  data: TransactionsType;
  open: boolean;
  onClose: () => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number, reason: string, other?: string) => void;
  isApproving?: boolean;
  isRejecting?: boolean;
}

const BuyRequestDetailsModal: React.FC<Props> = ({
  data,
  open,
  onClose,
  onApprove,
  onReject,
  isApproving,
  isRejecting,
}) => {
  const [confirming, setConfirming] = useState<"approve" | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const { extractedReference, referenceMatch } = useExtractReference(
    data?.receiptImageLinkUser,
    data?.referenceNumberUser
  );

  const handleRejectConfirmed = (reason: string, other?: string) => {
    onReject?.(data.id, reason, other);
    setShowRejectDialog(false);
    onClose();
  };
  console.log(data);
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
                  <span className="text-gray-300">Amount Deposited:</span>
                  <PHPDisplay value={data.depositedAmount} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Transaction Fee:</span>
                  <PHPDisplay value={data.transactionFee} />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#3A3A3A] my-2"></div>

              {/* Bank Info Section */}
              <h2 className="text-lg font-bold text-golden">Customer Info</h2>

              <div className="grid grid-cols-1 gap-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Customer Name:</span>
                  <span className="font-medium text-white">
                    {data.customer?.firstName} {data?.customer?.lastName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Reference Number:</span>
                  <span className="font-medium text-white">
                    {data?.referenceNumberUser}
                  </span>
                </div>

                {data.rejectReason && (
                  <div className="pt-2">
                    <span className="text-red-400 text-sm font-medium">
                      Rejection Reason: {data.rejectReason}
                    </span>
                  </div>
                )}
              </div>
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
                if (confirming === "approve") onApprove?.(data.id);
              }}
              disabled={isApproving}
            >
              {isApproving ? "Approving..." : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject reason dialog */}
      <RejectReasonDialog
        open={showRejectDialog}
        onCancel={() => setShowRejectDialog(false)}
        onConfirm={handleRejectConfirmed}
        isRejecting={isRejecting ?? false}
      />
    </Dialog>
  );
};

export default BuyRequestDetailsModal;
