import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types/customer.types";
import useStore from "@/zustand/store/store";
import { MoreVertical, Loader2 } from "lucide-react";

type UserActionMenuProps = {
  userData: User;
};

export default function UserActionMenu({ userData }: UserActionMenuProps) {
  const {
    fetchWalletAddress,
    user,
    handleBlockedUnblock,
    handleLockedUnlock,
  } = useStore();

  const userId = userData?.userHash;
  const isRowLoading = user?.rowLoading?.[userId] ?? false;
  const isWalletLoading = user?.isLoading ?? false;
  const { blocked, login_attempt } = userData;
  const isLocked = login_attempt?.loginStatus === "Locked";

  const lockBtnText = isLocked ? "Unlock Account" : "Lock Account";
  const blockBtnText = blocked ? "Unblock User" : "Block User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">

        {/* Get Wallet Address */}
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            fetchWalletAddress(userData.userHash);
          }}
          disabled={isWalletLoading}
        >
          {isWalletLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          ) : (
            "Get Wallet Address"
          )}
        </DropdownMenuItem>

        {/* Lock/Unlock User */}
        {isLocked && <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            if (userId && !isRowLoading) handleLockedUnlock(userId, true);
          }}
          disabled={isRowLoading || !isLocked}
        >
          <div className="flex items-center gap-2">
            {isRowLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            {lockBtnText}
          </div>
        </DropdownMenuItem>}

        {/* Block/Unblock User */}
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            if (userId && !isRowLoading)
              handleBlockedUnblock(userId, blocked); 
          }}
          disabled={isRowLoading}
        >
          <div className="flex items-center gap-2">
            {isRowLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            {blockBtnText}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
