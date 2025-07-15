/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/axios";
import type { User, UserStatusPayload } from "@/types/customer.types";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/verification/all-verified-list");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};

export const getWalletAddress = async (userHash: string): Promise<string> => {
  try {
    const res = await api.get(`/get-wallet-address-user/${userHash}`);
    return res.data.data;
  } catch (error: any) {
    throw new Error(error.response.data.error.message || "Failed");
  }
};

export const UnlockLockedUser = async (payload: UserStatusPayload) => {
  return await api.post(
    `/admin/edit/login-status/${payload.userHash}`,
    {
      newStatus: "Active",
      userHash: payload.userHash,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const UnblockedBlockUser = async (payload: UserStatusPayload) => {
  return await api.post(`/admin/blocked-users/${payload.userHash}`, {
    blocked: !payload.status,
  });
};

export const handleLockedUnlock = async (
  userHash: string,
  status: boolean,
  setLoading: (updater: (prev: any) => any) => void
) => {
  try {
    setLoading((prev) => ({ ...prev, [userHash]: true }));
    await UnlockLockedUser({ userHash, status });
  } catch (error) {
    console.error(error);
  } finally {
    setLoading((prev) => ({ ...prev, [userHash]: false }));
  }
};

export const handleBlockedUnblock = async (
  userHash: string,
  status: boolean,
  setLoading: (updater: (prev: any) => any) => void
) => {
  try {
    setLoading((prev) => ({ ...prev, [userHash]: true }));
    await UnblockedBlockUser({ userHash, status });
  } catch (error) {
    console.error(error);
  } finally {
    setLoading((prev) => ({ ...prev, [userHash]: false }));
  }
};
