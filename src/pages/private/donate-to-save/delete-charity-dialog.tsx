import { useState } from "react";
import { useCharities } from "@/hooks/use-charities";
import type { Charity } from "@/types/charity.types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteCharityDialogProps {
  charity: Charity | null;
  open: boolean;
  onClose: () => void;
}

export default function DeleteCharityDialog({ charity, open, onClose }: DeleteCharityDialogProps) {
  const { deleteCharity } = useCharities();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!charity) return;
    
    try {
      setIsDeleting(true);
      await deleteCharity(charity.id);
      onClose();
    } catch (error) {
      console.error("Failed to delete charity:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!charity) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Delete Charity
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {charity.imageUrl ? (
              <img
                src={charity.imageUrl}
                alt={charity.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-gray-500" />
              </div>
            )}
            <div>
              <p className="font-medium">{charity.name}</p>
              <p className="text-sm text-gray-500">{charity.category}</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800 text-sm">
              Are you sure you want to delete <strong>{charity.name}</strong>? 
              This action cannot be undone and will permanently remove all charity data.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "Deleting..." : "Delete Charity"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
