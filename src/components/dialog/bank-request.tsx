import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BankAccountVerification } from "@/types/bank-request.types";
import { Download } from "lucide-react";
import { useState } from "react";
import {
  TransformComponent,
  TransformWrapper
} from "react-zoom-pan-pinch";
import { ZoomControls } from "../features/zoom-controls";
import StatusChip from "../status-chip";
import RejectReasonDialog from "./reject-bank-request";

interface Props {
  data: BankAccountVerification;
  open: boolean;
  onClose: () => void;
  onApprove?: (id: number) => void;
  onReject?: (id: number, reason: string, other?: string) => void;
  isApproving?: boolean;
  isRejecting?: boolean;
}


const BankRequestDetailsModal: React.FC<Props> = ({
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

  const renderAttachment = (label: string, url: string | null) => (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">{label}</p>
        {url && (
          <a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 flex items-center gap-1 hover:underline"
          >
            <Download className="w-4 h-4" /> Download
          </a>
        )}
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
    onReject?.(data.id, reason, other);
    setShowRejectDialog(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl p-6 space-y-2">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-xl font-bold">
                  Bank Request Review
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Please verify that the bank information below matches the
                  submitted documents.
                </p>
              </div>
              <StatusChip status={data.statusOfVerification} />
            </div>
          </DialogHeader>

          {/* Bank Info */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-gray-700">
              Bank Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm text-gray-800">
              <div>
                <strong>Holder Name:</strong> {data.accountHolderName}
              </div>
              <div>
                <strong>Account Number:</strong> {data.accountNumber}
              </div>
              <div>
                <strong>Bank Name:</strong> {data.bankName}
              </div>
              <div>
                <strong>Country:</strong> {data.accountCountry}
              </div>
              <div>
                <strong>Currency:</strong> {data.currency}
              </div>
              <div>
                <strong>KYC Verified:</strong> {data.kycVerified}
              </div>
              <div>
                <strong>Status:</strong> {data.statusOfVerification}
              </div>
              <div>
                <strong>Entry Date:</strong>{" "}
                {new Date(data.dateEntry).toLocaleDateString()}
              </div>
              {data.rejectedReason && (
                <div className="col-span-2">
                  <strong>Rejection Reason:</strong> {data.rejectedReason}
                </div>
              )}
            </div>
          </div>

          {/* Attachments */}
          <div>
            <h3 className="text-base font-semibold mb-2 text-gray-700">
              Submitted Attachments
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Carefully inspect the documents to verify name, bank name, and
              account number.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderAttachment("Attachment One", data.attachmentOne)}
              {renderAttachment("Attachment Two", data.attachmentTwo)}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => setShowRejectDialog(true)}
              disabled={isRejecting}
              className="cursor-pointer"
            >
              Reject
            </Button>

            <Button
              onClick={() => setConfirming("approve")}
              disabled={isApproving}
              className="cursor-pointer"
            >
              Approve
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Approve confirmation */}
      <Dialog open={!!confirming} onOpenChange={() => setConfirming(null)}>
        <DialogContent className="max-w-md p-6 space-y-4">
          <DialogHeader>
            <DialogTitle>Approve this request?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Are you sure you want to <strong>approve</strong> this bank request?
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
    </>
  );
};

export default BankRequestDetailsModal;
