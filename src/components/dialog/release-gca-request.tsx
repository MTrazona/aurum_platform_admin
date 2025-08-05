import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { TransactionsType } from "@/types/buy-request.types";

interface ReleaseRequestModalProps {
  open: boolean;
  data: TransactionsType;
  loading: boolean;
  onClose: () => void;
  onSubmitForm: (data: { releaseDate: Date; file: File }) => Promise<void>;
}

const ReleaseRequestModal: React.FC<ReleaseRequestModalProps> = ({
  open,
  data,
  loading,
  onClose,
  onSubmitForm,
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = async () => {
    if (!date || !file) return;
    try {
      await onSubmitForm({ releaseDate: date, file });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <>
      {/* Confirmation Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
          </AlertDialogHeader>
          <p>Are you sure you want to submit this release request?</p>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Yes, Submit"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Main Modal */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Release Process – Deposit Slip
            </DialogTitle>
          </DialogHeader>

          {/* Narrative */}
          {data.narrative && <div>
            <label className="text-sm font-semibold">Narrative</label>
            <div className="mt-2 p-3 border rounded-md bg-muted text-sm whitespace-pre-line leading-relaxed">
              <div dangerouslySetInnerHTML={{__html:data.narrative}} />
            </div>
          </div>}

          {/* Tracking Number */}
          <div className=" flex justify-between items-center">
            <p className="text-sm font-semibold">Tracking Number</p>
            <p className="mt-1 text-sm">{data.trackingNumber}</p>
          </div>

          {/* Release Date */}
          <div>
            <label className="text-sm font-semibold text-red-500">
              *Release Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-full flex items-center p-3 border rounded-md bg-muted mt-1 justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPPp")
                  ) : (
                    <span>Select Date and Time</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* File Upload */}
          <div className="mt-4">
            <label className="text-sm font-semibold">
              Upload Screenshot of Payment Receipt
            </label>
            <label
              htmlFor="upload"
              className="mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 cursor-pointer hover:bg-gray-50"
            >
              <UploadCloud className="h-6 w-6 mb-2" />
              <span className="text-sm text-gray-600">
                {file ? file.name : "Upload your Payment Receipt Here"}
              </span>
              <input
                type="file"
                id="upload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={() => setConfirmOpen(true)}
              disabled={!date || !file || loading}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReleaseRequestModal;
