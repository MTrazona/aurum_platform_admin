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
import useStore from "@/zustand/store/store";

export function WalletAddressModal() {
  const { user, closeWalletAddressModal } = useStore();

  if (!user.isWalletAddressOpen) return null;

  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeWalletAddressModal()}>
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
            <Input id="wallet" value={user.walletAddress} readOnly />
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" onClick={closeWalletAddressModal} variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
