/* eslint-disable react-refresh/only-export-components */
import { fetchCurrentUser } from "@/apis/auth";
import axios from "axios";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Define user type
type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
};

type AuthContextType = {
  user: User | null;
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

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from API
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await fetchCurrentUser();
      console.log(res)
      setUser(res);
    } catch (err) {
      console.log(err)
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
    <AuthContext.Provider value={{ user, loading, logout, refetchUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
