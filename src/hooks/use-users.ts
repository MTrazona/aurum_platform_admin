/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchUsers,
  getWalletAddress,
  UnblockedBlockUser,
  UnlockLockedUser,
} from "@/apis/users";
import { queryClient } from "@/main";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useUsersHooks() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [isWalletAddressOpen, setIsWalletAddressOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletLoading, setIsWalletLoading] = useState(false);

  const [isBlockUpdating, setIsBlockUpdating] = useState(false);
  const [isLockUpdating, setIsLockUpdating] = useState(false);

  const fetchWalletAddress = async (userHash: string) => {
    setIsWalletLoading(true);
    try {
      const res = await getWalletAddress(userHash);
      if (res) setWalletAddress(res);
      setIsWalletAddressOpen(true);
    } catch (error: any) {
      console.error("Failed to fetch wallet address", error);
    } finally {
      setIsWalletLoading(false);
    }
  };

  const handleBlockedUnblock = async (userHash: string, status: boolean) => {
    setIsBlockUpdating(true);
    try {
      await UnblockedBlockUser({ userHash, status });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error: any) {
      console.error("Failed to update block status", error);
    } finally {
      setIsBlockUpdating(false);
    }
  };

  const handleLockedUnlock = async (userHash: string, status: boolean) => {
    setIsLockUpdating(true);
    try {
      await UnlockLockedUser({ userHash, status });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error: any) {
      console.error("Failed to update lock status", error);
    } finally {
      setIsLockUpdating(false);
    }
  };

  const closeWalletAddressModal = () => {
    setIsWalletAddressOpen(false);
    setWalletAddress("");
  };

  return {
    data,
    isLoading,
    isWalletAddressOpen,
    walletAddress,
    isWalletLoading,
    isBlockUpdating,
    isLockUpdating,
    fetchWalletAddress,
    handleBlockedUnblock,
    handleLockedUnlock,
    closeWalletAddressModal
  };
}
