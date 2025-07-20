// components/RejectReasonDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const predefinedReasons = [
  "Invalid bank account details",
  "Mismatched account holder name",
  "Blurred or unreadable attachment",
  "Fake or tampered document",
  "Other",
];

interface Props {
  open: boolean;
  onCancel: () => void;
  onConfirm: (reason: string, other?: string) => void;
  isRejecting: boolean;
}

const RejectReasonDialog: React.FC<Props> = ({
  open,
  onCancel,
  onConfirm,
  isRejecting,
}) => {
  const [selected, setSelected] = useState<string>("");
  const [other, setOther] = useState("");

  const isOther = selected === "Other";

  const handleConfirm = () => {
    const finalReason = isOther ? other.trim() : selected;
    if (finalReason) {
      onConfirm(selected, isOther ? other.trim() : undefined);
    }
  };

  const isConfirmDisabled = !selected || (isOther && !other.trim());

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-md p-6 ">
        <DialogHeader>
          <DialogTitle>Select Rejection Reason</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <label className="text-sm text-gray-600">Choose a reason:</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full border rounded p-2 text-sm"
          >
            <option value="">-- Select reason --</option>
            {predefinedReasons.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>

          {isOther && (
            <div className="pt-2">
              <label className="text-sm text-gray-600">
                Specify other reason:
              </label>
              <textarea
                rows={3}
                value={other}
                onChange={(e) => setOther(e.target.value)}
                className="w-full border rounded p-2 text-sm"
                placeholder="Type your custom reason..."
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            disabled={isConfirmDisabled || isRejecting}
            onClick={handleConfirm}
          >
            {isRejecting ? "Rejecting..." : "Confirm Reject"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RejectReasonDialog;
