"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Receipt,
  Wallet,
  TrendingUp,
  BarChart3,
  Bell,
  Settings,
  Building2,
  ChevronLeft,
} from "lucide-react";
import { useTranslations } from "next-intl";

const menuKeys = [
  { href: "/dashboard", key: "dashboard", icon: LayoutDashboard },
  { href: "/dashboard/contacts", key: "customers", icon: Users },
  { href: "/dashboard/orders", key: "orders", icon: FileText },
  { href: "/dashboard/billing", key: "invoices", icon: Receipt },
  { href: "/dashboard/expenses", key: "expenses", icon: Wallet },
  { href: "/dashboard/cashflow", key: "cashflow", icon: TrendingUp },
  { href: "/dashboard/reporting", key: "reporting", icon: BarChart3 },
  { href: "/dashboard/alerts", key: "alerts", icon: Bell },
  { href: "/dashboard/settings", key: "settings", icon: Settings },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <div
      className="flex flex-col h-full w-full sm:w-[400px]"
      style={{
        backgroundColor: "white",
        borderRight: "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Sidebar Header – grün wie Logo: #9FAF52, Building2, Übersicht */}
      <div
        className="h-14 flex items-center justify-between px-4"
        style={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          backgroundColor: "#9FAF52",
        }}
      >
        <div className="flex items-center gap-3">
          <Building2
            className="h-5 w-5 flex-shrink-0"
            style={{ color: "#000000" }}
          />
          <h2 className="font-medium" style={{ color: "#000000" }}>
            {t("dashboard")}
          </h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded transition-colors cursor-pointer"
            style={{
              backgroundColor: "transparent",
              border: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <ChevronLeft
              className="h-4 w-4"
              style={{ color: "#000000" }}
            />
          </button>
        )}
      </div>

      {/* Navigation Items – wie alt */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2">
        {menuKeys.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-all rounded-lg block w-full"
              style={{
                backgroundColor: isActive ? "#DCE6B5" : "transparent",
                color: "#000000",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#DCE6B5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isActive
                  ? "#DCE6B5"
                  : "transparent";
              }}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="flex-1 text-left">{t(item.key)}</span>
            </Link>
          );
        })}
      </div>

      {/* Version Info – wie alt, foreground-muted = #605e5c */}
      <div
        className="px-4 py-3 text-xs text-center"
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.06)",
          color: "var(--foreground-muted)",
          backgroundColor: "white",
        }}
      >
        zuraio v2.1.0
      </div>
    </div>
  );
}
