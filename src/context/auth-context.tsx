/* eslint-disable react-refresh/only-export-components */
import { fetchCurrentUser } from "@/apis/auth";
import type { Admin } from "@/types/auth.types";
import axios from "axios";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: Admin | null;
  loading: boolean;
  logout: () => void;
  refetchUser: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from API
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetchCurrentUser();
      setUser(res);
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await axios.post("/api/logout");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, logout, refetchUser: fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
