import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        <p className="text-sm font-medium text-white">{label}</p>
        {url && (
          <a
            href={url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 flex items-center gap-1 hover:underline"
          >
            <Download className="w-4 h-4" /> Download
          </a>
        )}
      </div>
      {url ? (
        <div className="relative border border-[#3A3A3A] rounded h-[400px] bg-black overflow-hidden">
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
        <div className="text-gray-400 italic border border-[#3A3A3A] rounded p-4 h-[400px] flex items-center justify-center">
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
        <DialogContent className="max-w-[65vw] min-w-[65vw] rounded-lg !bg-[#171717] text-white flex flex-col overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 max-h-[75vh] overflow-y-auto p-8">
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Bank Request Review
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    Please verify that the bank information below matches the
                    submitted documents.
                  </p>
                </div>
                <StatusChip status={data.statusOfVerification} />
              </div>

              {/* Attachments with Tabs */}
              <div>
                <h3 className="text-base font-semibold mb-2 text-white">
                  Submitted Attachments
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Carefully inspect the documents to verify name, bank name, and
                  account number.
                </p>
                
                <Tabs defaultValue="attachment1" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-[#1E1E1E] border border-[#3A3A3A]">
                    <TabsTrigger 
                      value="attachment1" 
                      className="data-[state=active]:bg-[#3A3A3A] data-[state=active]:text-white text-gray-300"
                    >
                      Attachment One
                    </TabsTrigger>
                    <TabsTrigger 
                      value="attachment2" 
                      className="data-[state=active]:bg-[#3A3A3A] data-[state=active]:text-white text-gray-300"
                    >
                      Attachment Two
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="attachment1" className="mt-4">
                    {renderAttachment("Attachment One", data.attachmentOne)}
                  </TabsContent>
                  
                  <TabsContent value="attachment2" className="mt-4">
                    {renderAttachment("Attachment Two", data.attachmentTwo)}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="flex-[0.5] mt-[34px]">
              <div className="space-y-6 bg-[#1E1E1E] p-6 rounded-xl border border-[#3A3A3A]">
                {/* Section Title */}
                <h2 className="text-lg font-bold text-golden">Bank Details</h2>

                <div className="grid grid-cols-1 gap-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Holder Name:</span>
                    <span className="font-medium text-white">{data.accountHolderName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Account Number:</span>
                    <span className="font-medium text-white">{data.accountNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Bank Name:</span>
                    <span className="font-medium text-white">{data.bankName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Country:</span>
                    <span className="font-medium text-white">{data.accountCountry}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Currency:</span>
                    <span className="font-medium text-white">{data.currency}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">KYC Verified:</span>
                    <span className="font-medium text-white">{data.kycVerified}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Status:</span>
                    <span className="font-medium text-white">{data.statusOfVerification}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Entry Date:</span>
                    <span className="font-medium text-white">
                      {new Date(data.dateEntry).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[#3A3A3A] my-2"></div>

                {data.rejectedReason && (
                  <div>
                    <h3 className="text-lg font-bold text-golden mb-2">Rejection Details</h3>
                    <div className="pt-2">
                      <span className="text-red-400 text-sm font-medium">
                        Rejection Reason: {data.rejectedReason}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons with Validation */}
              <div className="flex gap-2 pt-4">
                {data.statusOfVerification !== "Approved" && data.statusOfVerification !== "Rejected" && (
                  <>
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
                  </>
                )}
                
                {data.statusOfVerification === "Approved" && (
                  <div className="w-full text-center py-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <span className="text-green-400 text-sm font-medium">
                      ✓ This request has been approved
                    </span>
                  </div>
                )}
                
                {data.statusOfVerification === "Rejected" && (
                  <div className="w-full text-center py-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <span className="text-red-400 text-sm font-medium">
                      ✗ This request has been rejected
                    </span>
                  </div>
                )}
              </div>
            </div>
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
