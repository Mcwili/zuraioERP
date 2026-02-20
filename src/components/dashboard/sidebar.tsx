"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { menuKeys } from "./nav-config";

interface SidebarProps {
  onClose?: () => void;
  /** Bei true wird beim Klick auf einen Menüpunkt onClose aufgerufen (z.B. für Mobile) */
  closeOnLinkClick?: boolean;
  isAdmin?: boolean;
  /** Bei true zeigt der SharePoint-Link den Explorer, sonst die Einstellungen */
  sharePointConfigured?: boolean;
}

export function Sidebar({ onClose, closeOnLinkClick, isAdmin = false, sharePointConfigured = false }: SidebarProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <div
      className="flex flex-col h-full w-full sm:w-[280px]"
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
        <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
          <Building2
            className="h-5 w-5 flex-shrink-0"
            style={{ color: "#000000" }}
          />
          <h2 className="font-medium truncate min-w-0" style={{ color: "#000000" }}>
            {t("dashboard")}
          </h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2 -m-2 rounded transition-colors cursor-pointer touch-manipulation"
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
              className="h-5 w-5 pointer-events-none"
              style={{ color: "#000000" }}
            />
          </button>
        )}
      </div>

      {/* Navigation Items – wie alt */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2">
        {menuKeys
          .filter((item) => !item.adminOnly || isAdmin)
          .map((item) => {
          const href =
            item.key === "sharePoint" && sharePointConfigured
              ? "/dashboard/sharepoint"
              : item.href;
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);
          return (
            <Link
              key={item.key}
              href={href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-all rounded-lg block w-full"
              style={{
                backgroundColor: isActive ? "#DCE6B5" : "transparent",
                color: "#000000",
              }}
              onClick={() => {
                if (closeOnLinkClick && onClose) onClose();
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
              <span className="flex-1 text-left min-w-0 truncate">{t(item.key)}</span>
            </Link>
          );
        })}
      </div>

      {/* Version Info – wie alt, foreground-muted = #605e5c */}
      <div
        className="px-4 py-3 text-xs text-left"
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
