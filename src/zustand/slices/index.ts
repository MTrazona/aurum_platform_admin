import { type StateCreator } from "zustand/vanilla";

interface AdminState {
  isLoading?: boolean;
  isAuthenticated?: boolean;
  isError?: boolean;
  errorMessage?: string;
  jwt?: string | null;
}

export interface AdminSlice {
  admin: AdminState;
  saveToken: (payload: string) => void;
}

const initialState: AdminState = {
  isLoading: false,
  isAuthenticated: false,
  isError: false,
  errorMessage: "",
  jwt: null,
};

const createAdminSlice: StateCreator<AdminSlice> = (set) => ({
  admin: initialState,
  saveToken: (payload) => {
    set((state) => ({
        ...state,
        admin: {
            ...state.admin,
            jwt: payload,
            isAuthenticated: true
        }
    }))
  },
});

export default createAdminSlice
