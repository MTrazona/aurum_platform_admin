import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TransactionsType } from "@/types/buy-request.types";
import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CustomTextEditor from "../custom-editor";
import { PHPDisplay } from "../features/price-display";
import { ZoomControls } from "../features/zoom-controls";
import StatusChip from "../status-chip";
import { Checkbox } from "../ui/checkbox";
import RejectReasonDialog from "./reject-bank-request";
import { viewDepositSlip } from "@/apis/gca-request";

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
  isRemarking?:boolean;
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
  isRemarking
}) => {
  const [confirming, setConfirming] = useState<"approve" | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [narrative, setNarrative] = useState("");
  const [remarks, setRemarks] = useState(data?.remarks ?? "");
  const [remarkTags, setRemarkTags] = useState<string[]>([]);

  const handleViewDepositSlip = async () => {
    try {
      const res = await viewDepositSlip(data.id);
      window.open(res, "_blank");
    } catch (error) {
      console.log(error);
    }
  };
  const renderAttachment = (label: string, url: string | null) => (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">{label}</p>
        <Button
          className="cursor-pointer"
          onClick={() => handleViewDepositSlip()}
        >
          View Payment Instruction
        </Button>
      </div>
      {url ? (
        <div className="relative border rounded h-[300px] bg-black overflow-hidden">
          <TransformWrapper>
            <ZoomControls />
            <TransformComponent>
              <img
                src={url}
                alt={label}
                className="w-full h-full object-contain"
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      ) : (
        <div className="text-gray-400 italic border rounded p-4 h-[300px] flex items-center justify-center">
          No {label.toLowerCase()}
        </div>
      )}
    </div>
  );

  const handleRejectConfirmed = (reason: string, other?: string) => {
    onUpdate(data.id, "Rejected", narrative, reason ?? other);
    setShowRejectDialog(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl lg:min-w-2xl  space-y-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader className=" bg-white p-2 border-b">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl font-bold">
                Review GCA Request Receipt
              </DialogTitle>
            </div>
            <StatusChip status={data.transactionStatus} />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Please review the deposit receipt and associated bank details
            submitted by the customer. Ensure the information is valid and
            matches the transaction request.
          </p>
        </DialogHeader>

        {/* Bank Info */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-700">
            Bank & Transaction Details
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Carefully verify the payment method, reference number, and deposited
            amount. Approval should only proceed if all information matches a
            valid deposit.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-800">
            <div className="flex items-center gap-2">
              <strong>Paid Amount:</strong>
              <PHPDisplay value={data.fromValue} />
            </div>
            <div className="flex items-center gap-2">
              <strong>Bank Name:</strong> {data.bankCustomer?.bankName}
            </div>
            <div className="flex items-center gap-2">
              <strong>Transaction Fee:</strong>{" "}
              <PHPDisplay value={data.transactionFee} />
            </div>
            <div>
              <strong>Account Number:</strong>{" "}
              {data.bankCustomer?.accountNumber}
            </div>
            <div className="flex items-center gap-2">
              <strong>Currency Fund:</strong>{" "}
              <PHPDisplay value={data.toValue} />
            </div>
            <div className="flex gap-2 items-center">
              <strong>Account Holder Name:</strong>{" "}
              {data.bankCustomer?.accountHolderName}
            </div>
            {data.rejectReason && (
              <div className="col-span-2">
                <strong>Rejection Reason:</strong> {data.rejectReasonOthers}
              </div>
            )}
          </div>
        </div>

        {/* Attachments */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-700">
            Uploaded Receipt
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Inspect the uploaded receipt to confirm the validity of the payment.
            Ensure the date, amount, and reference number align with the
            provided transaction data.
          </p>

          <div className="grid grid-cols-1">
            {renderAttachment(
              `Reference Number: ${data.referenceNumberUser}`,
              data.receiptImageLinkUser
            )}
          </div>
        </div>
        <div>
          <h1 className="text-sm font-medium mb-4">Narrative</h1>
          <CustomTextEditor value={narrative} onChange={setNarrative} />

          <div className="flex flex-nowrap gap-2 pt-4">
            <Button
              variant="destructive"
              onClick={() => setShowRejectDialog(true)}
              disabled={isRejecting}
              className="cursor-pointer flex-1"
            >
              Reject
            </Button>

            <Button
              onClick={() => setConfirming("approve")}
              disabled={isApproving}
              className="cursor-pointer flex-1"
            >
              Approve
            </Button>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-sm font-medium mb-4">Remarks</h1>
            <div className="flex items-center gap-4 flex-wrap">
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
          <CustomTextEditor value={remarks} onChange={setRemarks} />
        </div>
        <Button
          onClick={() => onRemarks(data.id, remarks, remarkTags)}
          disabled={isApproving}
          className="cursor-pointer"
        >
          {isRemarking ? "Updating" : "Update"}
        </Button>
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
                  onUpdate(data.id, "Approved", narrative);
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

export default GCARequestDetailsModal;
