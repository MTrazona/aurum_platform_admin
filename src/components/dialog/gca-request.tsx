import { viewDepositSlip } from "@/apis/gca-request";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useExtractReference } from "@/hooks/use-extract-reference";
import type { TransactionsType } from "@/types/buy-request.types";
import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CustomTextEditor from "../custom-editor";
import { PHPDisplay } from "../features/price-display";
import { ZoomControls } from "../features/zoom-controls";
import { Checkbox } from "../ui/checkbox";
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
  onUpdate: (
    id: number | string,
    transactionStatus: string,
    narrative: string,
    rejectReason?: string
  ) => void;
  isApproving?: boolean;
  isRejecting?: boolean;
  isRemarking?: boolean;
}

const remarkOptions = ["On Hold", "Third Party", "Others"];

const GCARequestDetailsModal: React.FC<Props> = ({
  data,
  open,
  onClose,
  onRemarks,
  onUpdate,
  isApproving,
  isRejecting,
  isRemarking,
}) => {
  const [confirming, setConfirming] = useState<"approve" | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [narrative, setNarrative] = useState("");
  const [remarks, setRemarks] = useState(data?.remarks ?? "");
  const [remarkTags, setRemarkTags] = useState<string[]>([]);
  const { extractedReference, referenceMatch } = useExtractReference(
    data?.receiptImageLinkUser,
    data?.referenceNumberUser
  );

  const handleViewDepositSlip = async () => {
    try {
      const res = await viewDepositSlip(data.id);
      window.open(res, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectConfirmed = (reason: string, other?: string) => {
    onUpdate(data.id, "Rejected", narrative, reason ?? other);
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

              {/* Button */}
              <Button
                className="mt-4 py-3 w-full"
                variant="secondary"
                onClick={handleViewDepositSlip}
              >
                View Payment Instruction
              </Button>
            </div>

            <div className="mt-6">
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
              <CustomTextEditor classes="border-0" value={remarks} onChange={setRemarks} />
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

      <Dialog open={!!confirming} onOpenChange={() => setConfirming(null)}>
        <DialogContent className="max-w-md p-6 space-y-4 bg-white rounded-lg text-black">
          <DialogTitle>Confirm Approval</DialogTitle>
          <p className="text-sm text-gray-600">
            Please confirm that you have reviewed and validated the receipt.
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setConfirming(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (confirming === "approve")
                  onUpdate(data.id, "Approved", narrative);
              }}
              disabled={isApproving}
              className="bg-golden"
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

export default GCARequestDetailsModal;
