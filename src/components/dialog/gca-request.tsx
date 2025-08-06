import { viewDepositSlip } from "@/apis/gca-request";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TransactionsType } from "@/types/buy-request.types";
import { useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CustomTextEditor from "../custom-editor";
import { PHPDisplay } from "../features/price-display";
import { ZoomControls } from "../features/zoom-controls";
import { Checkbox } from "../ui/checkbox";
import RejectReasonDialog from "./reject-bank-request";
import Tesseract from "tesseract.js";

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

  const [ocrText, setOcrText] = useState("");
  const [extractedReference, setExtractedReference] = useState("");
  const [referenceMatch, setReferenceMatch] = useState<
    "matched" | "not-matched" | "loading" | ""
  >("");

  useEffect(() => {
    const extractReference = async () => {
      if (!data?.receiptImageLinkUser || !data?.referenceNumberUser) return;

      setReferenceMatch("loading");

      try {
        const result = await Tesseract.recognize(
          data.receiptImageLinkUser,
          "eng"
        );
        const rawText = result.data.text;
        setOcrText(rawText);
        console.log("OCR Text:", rawText);
        console.log("REFERENCE NUMBER TO FIND:", data.referenceNumberUser);

        // Normalize the OCR text and build a regex pattern
        const cleanText = rawText.replace(/\s+/g, "").toLowerCase(); // Remove all whitespace
        const refPattern = data.referenceNumberUser
          .split("")
          .map((char) => `${char}\\s*`) // allow optional spacing between each char
          .join("");
        console.log("Clean text", cleanText);
        const regex = new RegExp(refPattern, "i"); // case-insensitive search

        if (regex.test(cleanText)) {
          setExtractedReference(data.referenceNumberUser);
          setReferenceMatch("matched");
        } else {
          setExtractedReference("Not found");
          setReferenceMatch("not-matched");
        }
      } catch (err) {
        console.error("OCR failed:", err);
        setExtractedReference("Error");
        setReferenceMatch("not-matched");
      }
    };

    extractReference();
  }, [data?.receiptImageLinkUser, data?.referenceNumberUser]);

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
      <DialogContent className="max-w-[99vw] min-w-[95vw] h-screen p-8 rounded-none bg-zinc-900 text-white flex flex-col overflow-hidden">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-white">
            Review GCA Request Receipt
          </DialogTitle>
          <p className="text-sm text-gray-400">
            Please review the deposit receipt and associated bank details
            submitted by the customer.
          </p>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-8 max-h-[75vh]">
          {/* LEFT COLUMN */}
          <div className="flex-1 overflow-hidden">
            <div className="space-y-2">
              <h3 className="text-base font-semibold">
                Bank & Transaction Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <strong>Paid Amount:</strong>
                  <PHPDisplay value={data.fromValue} />
                </div>
                <div className="flex items-center gap-2">
                  <strong>Bank Name:</strong> {data.bankCustomer?.bankName}
                </div>
                <div className="flex items-center gap-2">
                  <strong>Transaction Fee:</strong>
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
              <Button
                onClick={() => onRemarks(data.id, remarks, remarkTags)}
                disabled={isRemarking}
                className="mt-4 w-full bg-golden"
              >
                {isRemarking ? "Updating..." : "Update Remarks"}
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-1 overflow-y-auto pr-1 max-h-[75vh] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-semibold">Uploaded Receipt</h3>
              <Button variant="secondary" onClick={handleViewDepositSlip}>
                View Payment Instruction
              </Button>
            </div>

            {/* OCR status */}
            {referenceMatch === "loading" && (
              <p className="text-sm text-yellow-400 italic">
                🔍 Checking reference number...
              </p>
            )}
            {referenceMatch === "matched" && (
              <p className="text-sm text-green-400 font-semibold">
                ✅ Reference number matched:{" "}
                <span className="underline">{extractedReference}</span>
              </p>
            )}
            {referenceMatch === "not-matched" && (
              <p className="text-sm text-red-400 font-semibold">
                ❌ Reference number mismatch. Found:{" "}
                <span className="underline">{extractedReference}</span>
              </p>
            )}
            <div className="mt-4 border border-gray-700 bg-zinc-800 p-4 rounded-md max-h-60 overflow-y-auto">
              <h4 className="font-semibold mb-2 text-white">🧾 OCR Preview</h4>
              <pre className="text-sm text-gray-200 whitespace-pre-wrap break-words">
                {ocrText
                  ? ocrText
                      .split(new RegExp(`(${data.referenceNumberUser})`, "gi"))
                      .map((part, i) =>
                        part.toLowerCase() ===
                        data.referenceNumberUser.toLowerCase() ? (
                          <mark
                            key={i}
                            className="bg-yellow-400 text-black px-1 rounded"
                          >
                            {part}
                          </mark>
                        ) : (
                          part
                        )
                      )
                  : "Extracting OCR..."}
              </pre>
            </div>

            {/* Image */}
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
        </div>
      </DialogContent>

      {/* Confirm Dialog */}
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
