import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types/customer.types";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

type UserActionMenuProps = {
  userData: User;
  fetchWalletAddress: (userHash: string) => Promise<void>;
  handleBlockedUnblock: (userHash: string, status: boolean) => Promise<void>;
  handleLockedUnlock: (userHash: string, status: boolean) => Promise<void>;
};

export default function UserActionMenu({
  userData,
  fetchWalletAddress,
  handleBlockedUnblock,
  handleLockedUnlock,
}: UserActionMenuProps) {
  const navigate = useNavigate()
  const userId = userData?.userHash;
  const { blocked, login_attempt } = userData;
  const isLocked = login_attempt?.loginStatus === "Locked";

  const lockBtnText = isLocked ? "Unlock Account" : "Lock Account";
  const blockBtnText = blocked ? "Unblock User" : "Block User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-full flex items-center justify-center h-full"
        asChild
      >
        <button className="cursor-pointer">
          <MoreVertical className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Get Wallet Address */}
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            fetchWalletAddress(userData.userHash);
          }}
        >
          Get Wallet Address
        </DropdownMenuItem>

        {/* Lock/Unlock User */}
        {isLocked && (
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              if (userId) handleLockedUnlock(userId, true);
            }}
          >
            <div className="flex items-center gap-2">{lockBtnText}</div>
          </DropdownMenuItem>
        )}

        {/* Block/Unblock User */}
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            if (userId) handleBlockedUnblock(userId, blocked);
          }}
        >
          <div className="flex items-center gap-2">{blockBtnText}</div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            if (userId) navigate(`/users/${userData.id}`);
          }}
        >
          <div className="flex items-center gap-2">View</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
