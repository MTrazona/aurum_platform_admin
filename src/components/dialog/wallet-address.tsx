import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type WalletAddressModalProps = {
  isOpen: boolean;
  walletAddress: string;
  onClose: () => void;
};

export function WalletAddressModal({
  isOpen,
  walletAddress,
  onClose,
}: WalletAddressModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Wallet Address</DialogTitle>
          <DialogDescription>
            Anyone who has this address can use it for transactions or verification.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="wallet" className="sr-only">
              Wallet Address
            </Label>
            <Input id="wallet" value={walletAddress} readOnly />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button className="cursor-pointer" type="button" onClick={onClose} variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

