import type { Admin } from "@/types/auth.types";

export type AppRole = "ADMIN" | "SUPPORT" | "UNKNOWN";

export const Roles = {
  Admin: "ADMIN" as AppRole,
  Support: "SUPPORT" as AppRole,
  Unknown: "UNKNOWN" as AppRole,
};

export function getRoleFromUser(user: Admin | null): AppRole {
  const raw = user?.userType?.userType ?? "";
  const normalized = String(raw).trim().toLowerCase();

  if (normalized.includes("admin")) return Roles.Admin;
  if (normalized.includes("support")) return Roles.Support;

  // Fallbacks for common variants
  if (["cs", "customer_support", "customer-support"].includes(normalized)) return Roles.Support;
  if (["superadmin", "super_admin", "super-admin"].includes(normalized)) return Roles.Admin;

  return Roles.Unknown;
}

export function canAccess(role: AppRole, allowedRoles?: AppRole[]): boolean {
  // Default to admin-only if not explicitly specified
  const roles = allowedRoles && allowedRoles.length > 0 ? allowedRoles : [Roles.Admin];
  if (role === Roles.Admin) return true; // Admin can access everything
  return roles.includes(role);
}

export function getDefaultHomeForRole(role: AppRole): string {
  if (role === Roles.Support) return "/users"; // Customer support landing
  return "/dashboard"; // Admin landing
}

