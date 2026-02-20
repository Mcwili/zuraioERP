"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Bell, Building2, Settings, LogOut } from "lucide-react";
import { LocaleSwitcher } from "./locale-switcher";

type UserProfile = { id: string; email: string; name: string | null; imageUrl: string | null } | null;

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  userProfile: UserProfile;
  importantAlertsCount?: number;
}

export function Header({ sidebarOpen, onToggleSidebar, userProfile, importantAlertsCount = 0 }: HeaderProps) {
  const t = useTranslations("nav");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header
      className="h-16 flex items-center justify-between gap-2 px-4 md:px-6 relative min-w-0 z-50"
      style={{
        backgroundColor: "var(--color-header-background)",
        borderBottom: "1px solid var(--color-header-border)",
        boxShadow: "var(--shadow-header)",
      }}
    >
      {/* Left – Logo */}
      <div className="flex items-center gap-3 min-w-0">
        <Link href="/dashboard" className="flex shrink-0">
          <Image
            src="/assets/260209_Zuraio_Logo_and_Claim.svg"
            alt="zuraio - own your data"
            width={200}
            height={61}
            className="h-8 w-auto object-contain max-w-[140px] md:max-w-none"
          />
        </Link>
      </div>

      {/* Center – Building2 Toggle (Menü öffnen/schliessen) */}
      <div className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-2">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="h-8 w-8 p-0 rounded-md flex items-center justify-center transition-colors shrink-0"
          style={{
            backgroundColor: sidebarOpen ? "#DCE6B5" : "transparent",
          }}
          aria-label="Menü öffnen"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#DCE6B5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = sidebarOpen
              ? "#DCE6B5"
              : "transparent";
          }}
        >
          <Building2
            className="h-[18px] w-[18px]"
            style={{ color: "var(--color-gray-dark)" }}
          />
        </button>
      </div>

      {/* Right – Locale, Alerts, Logout */}
      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <LocaleSwitcher />
        <Link
          href="/dashboard/alerts"
          className="relative p-2 rounded-md transition-colors"
          style={{
            color: "var(--color-gray-dark)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#DCE6B5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <Bell className="h-5 w-5" />
          {importantAlertsCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-500 rounded-full text-[10px] flex items-center justify-center text-white font-medium">
              {importantAlertsCount > 99 ? "99+" : importantAlertsCount}
            </span>
          )}
        </Link>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-full transition-colors shrink-0"
            style={{ color: "var(--color-gray-dark)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#DCE6B5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            title={userProfile?.name || userProfile?.email || ""}
          >
            <div
              className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 border-2"
              style={{
                backgroundColor: "#DCE6B5",
                borderColor: "var(--color-header-border, #e1dfdd)",
              }}
            >
              {userProfile?.imageUrl ? (
                <Image
                  src={userProfile.imageUrl}
                  alt={userProfile.name || userProfile.email}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-sm font-semibold" style={{ color: "#1c1c1c" }}>
                  {userProfile?.name?.[0] || userProfile?.email?.[0]?.toUpperCase() || "?"}
                </span>
              )}
            </div>
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-full mt-2 py-1 min-w-[180px] rounded-lg shadow-lg z-50"
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e1dfdd",
              }}
            >
              <Link
                href="/dashboard/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-[#DCE6B5]"
                style={{ color: "var(--color-gray-dark)" }}
              >
                <Settings className="h-4 w-4" />
                {t("settings")}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  signOut({ callbackUrl: "/login" });
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors hover:bg-[#DCE6B5] text-left"
                style={{ color: "var(--color-gray-dark)" }}
              >
                <LogOut className="h-4 w-4" />
                {t("logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
