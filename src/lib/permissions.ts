import type { Role } from "@prisma/client";

export function hasRole(userRole: Role, required: Role | Role[]): boolean {
  const roles = Array.isArray(required) ? required : [required];
  return roles.includes(userRole);
}

export function canAccessContacts(role: Role): boolean {
  return ["ADMIN", "SALES", "PROJECT_LEAD", "FINANCE", "MANAGEMENT"].includes(
    role
  );
}

export function canAccessOrders(role: Role): boolean {
  return ["ADMIN", "SALES", "PROJECT_LEAD", "FINANCE", "DELIVERY", "MANAGEMENT"].includes(
    role
  );
}

export function canAccessBilling(role: Role): boolean {
  return ["ADMIN", "FINANCE", "MANAGEMENT"].includes(role);
}

export function canAccessProducts(role: Role): boolean {
  return ["ADMIN", "SALES", "PROJECT_LEAD", "FINANCE", "DELIVERY", "MANAGEMENT"].includes(
    role
  );
}

export function canAccessAlerts(role: Role): boolean {
  return true; // Alle Rollen
}

export function canManageUsers(role: Role): boolean {
  return role === "ADMIN";
}
