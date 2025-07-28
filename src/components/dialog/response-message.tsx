// components/dialog/ResponseMessageDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ResponseMessageDialogProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  status?: "success" | "error";
  onClose: () => void;
};

export function ResponseMessageDialog({
  isOpen,
  title = "Notification",
  message,
  status = "success",
  onClose,
}: ResponseMessageDialogProps) {
  const color =
    status === "success" ? "text-green-600" : "text-red-600";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${color}`}>
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground">{message}</div>

        <DialogFooter className="pt-4">
          <Button onClick={onClose} variant="secondary">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
