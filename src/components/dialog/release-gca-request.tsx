import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

interface ReleaseGCARequestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitForm: (data: { releaseDate: Date; file: File }) => Promise<void>;
}

const ReleaseGCARequestModal: React.FC<ReleaseGCARequestModalProps> = ({ open, onClose, onSubmitForm }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = async () => {
    if (!date || !file) return;
    setLoading(true);
    try {
      await onSubmitForm({ releaseDate: date, file });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
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
            <DialogTitle className="text-xl font-bold">Release Process – Deposit Slip</DialogTitle>
          </DialogHeader>

          {/* Narrative */}
          <div>
            <label className="text-sm font-semibold">Narrative</label>
            <div className="mt-2 p-3 border rounded-md bg-muted text-sm whitespace-pre-line leading-relaxed">
              19-May-2025 ATRC ATM/B2C ACCOUNT 28,000.00
              <br />
              C94_452_290087 20250519BOPIPHMMXXXB0000000000973315
              <br />
              C BOPI INST Jocelyn Maria Toledo
            </div>
          </div>

          {/* Tracking Number */}
          <div className=" flex justify-between items-center">
            <p className="text-sm font-semibold">Tracking Number</p>
            <p className="mt-1 text-sm">GCA-1596-06242025</p>
          </div>

          {/* Release Date */}
          <div>
            <label className="text-sm font-semibold text-red-500">*Release Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPPp") : <span>Select Date and Time</span>}
                </Button>
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
            <label className="text-sm font-semibold">Upload Screenshot of Payment Receipt</label>
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

export default ReleaseGCARequestModal;
