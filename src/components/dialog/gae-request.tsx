import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { TransactionsType } from "@/types/buy-request.types";
import { dateStringFormatter } from "@/utils/format-helper";
import { Download } from "lucide-react";
import { useState } from "react";
import {
    TransformComponent,
    TransformWrapper
} from "react-zoom-pan-pinch";
import {
    ConversionDisplay,
    GAEDisplay,
    QMGTDisplay,
    UnitValueDisplay
} from "../features/price-display";
import { ZoomControls } from "../features/zoom-controls";
import StatusChip from "../status-chip";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
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


const GAERequestDetailsModal: React.FC<Props> = ({
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl lg:min-w-2xl  space-y-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader className=" bg-white p-2 border-b">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl font-bold">
                Review GAE Request Receipt
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Section 1 */}
            <div className="space-y-2">
              <p>
                <strong>Customer Name:</strong> {data.customer?.firstName}{" "}
                {data.customer?.lastName}
              </p>
              <div className="flex items-center gap-2">
                <strong>Total Buy Units:</strong>{" "}
                <GAEDisplay value={data.fromValue} />
              </div>
              <p>
                <strong>Paid In:</strong> PHP
              </p>
              <div className="flex items-center gap-2">
                <strong>Total Unit Value:</strong>{" "}
                <UnitValueDisplay data={data} />
              </div>
              <div className="flex items-center gap-2">
                <strong>Total QMGT Holdings:</strong>{" "}
                <QMGTDisplay value={data.bookingNote ?? 0} />
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <strong>Down Payment:</strong>{" "}
                <ConversionDisplay
                  currency="PHP"
                  fromValue={data.gaeDownPayment ?? 0}
                  rate={data.usdRate ?? 0}
                />
              </div>
              <div className="flex items-center gap-2">
                <strong>Management Fee:</strong>{" "}
                <ConversionDisplay
                  currency="PHP"
                  fromValue={data.managementFeeAdvance ?? 0}
                  rate={data.usdRate ?? 0}
                />
              </div>
              <div className="flex items-center gap-2">
                <strong>Transaction Fee:</strong>{" "}
                <ConversionDisplay
                  currency="PHP"
                  fromValue={data.transactionFee ?? 0}
                  rate={data.usdRate ?? 0}
                />
              </div>

              <div className="flex items-center gap-2">
                <strong>GAE to be Paid:</strong>{" "}
                <ConversionDisplay
                  currency="PHP"
                  fromValue={data.gaeTotal ?? 0}
                  rate={data.usdRate ?? 0}
                />
              </div>
              <p>
                <strong>Date Submitted:</strong> {dateStringFormatter(data.trDate)}
              </p>
            </div>
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
          <Textarea placeholder="Add narrative." />
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox />
                <p>On Hold</p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox />
                <p>Third Party</p>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox />
                <p>Others</p>
              </div>
            </div>
          </div>
          <Textarea placeholder="Add Remarks." />
        </div>
        <Button
          onClick={() => setConfirming("approve")}
          disabled={isApproving}
          className="cursor-pointer"
        >
          Update
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

export default GAERequestDetailsModal;
