import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { Roles, type AppRole, canAccess, getRoleFromUser, getDefaultHomeForRole } from "@/lib/rbac";

type RoleGuardProps = {
  children: React.ReactNode;
  allowed?: AppRole[];
};

export default function RoleGuard({ children, allowed = [Roles.Admin] }: RoleGuardProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  const role = getRoleFromUser(user);
  const permitted = canAccess(role, allowed);

  if (!permitted) {
    const home = getDefaultHomeForRole(role);
    return <Navigate to={home} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

