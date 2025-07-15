/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getWalletAddress,
  UnblockedBlockUser,
  UnlockLockedUser,
} from "@/apis/users";
import { queryClient } from "@/main";
import { type StateCreator } from "zustand/vanilla";

interface UserState {
  isLoading: boolean;
  isWalletAddressOpen: boolean;
  walletAddress: string;
  errorMessage: string;
  rowLoading: Record<string, boolean>;
}

export interface UserSlice {
  user: UserState;
  fetchWalletAddress: (userHash: string) => Promise<void>;
  closeWalletAddressModal: () => void;
  handleBlockedUnblock: (userHash: string, status: boolean) => Promise<void>;
  handleLockedUnlock: (userHash: string, status: boolean) => Promise<void>;
}

const initialState: UserState = {
  isLoading: false,
  isWalletAddressOpen: false,
  walletAddress: "",
  errorMessage: "",
  rowLoading: {}, // <--- new
};

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: initialState,

  fetchWalletAddress: async (userHash: string) => {
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        isLoading: true,
        errorMessage: "",
      },
    }));

    try {
      const res = await getWalletAddress(userHash);
      set((state) => ({
        ...state,
        user: {
          ...state.user,
          walletAddress: res,
          isWalletAddressOpen: true,
          isLoading: false,
        },
      }));
    } catch (error: any) {
      set((state) => ({
        ...state,
        user: {
          ...state.user,
          errorMessage: error?.message || "Failed to fetch wallet address",
          isLoading: false,
        },
      }));
    }
  },

  closeWalletAddressModal: () => {
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        isWalletAddressOpen: false,
        walletAddress: "",
      },
    }));
  },

  handleBlockedUnblock: async (userHash: string, status: boolean) => {
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        rowLoading: {
          ...state.user.rowLoading,
          [userHash]: true,
        },
      },
    }));

    try {
      await UnblockedBlockUser({ userHash, status });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error: any) {
      console.error("Failed to update block status", error);
    } finally {
      set((state) => ({
        ...state,
        user: {
          ...state.user,
          rowLoading: {
            ...state.user.rowLoading,
            [userHash]: false,
          },
        },
      }));
    }
  },

  handleLockedUnlock: async (userHash: string, status: boolean) => {
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        rowLoading: {
          ...state.user.rowLoading,
          [userHash]: true,
        },
      },
    }));

    try {
      await UnlockLockedUser({ userHash, status });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error: any) {
      console.error("Failed to update lock status", error);
    } finally {
      set((state) => ({
        ...state,
        user: {
          ...state.user,
          rowLoading: {
            ...state.user.rowLoading,
            [userHash]: false,
          },
        },
      }));
    }
  },
});

export default createUserSlice;
