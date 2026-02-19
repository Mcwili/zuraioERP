import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Receipt,
  Wallet,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";

export const menuKeys: { href: string; key: string; icon: LucideIcon }[] = [
  { href: "/dashboard", key: "dashboard", icon: LayoutDashboard },
  { href: "/dashboard/contacts", key: "customers", icon: Users },
  { href: "/dashboard/orders", key: "orders", icon: FileText },
  { href: "/dashboard/billing", key: "invoices", icon: Receipt },
  { href: "/dashboard/expenses", key: "expenses", icon: Wallet },
  { href: "/dashboard/reporting", key: "reporting", icon: BarChart3 },
  { href: "/dashboard/alerts", key: "alerts", icon: Bell },
  { href: "/dashboard/settings", key: "settings", icon: Settings },
];
