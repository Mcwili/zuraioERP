"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Bell, Building2 } from "lucide-react";
import { LocaleSwitcher } from "./locale-switcher";

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  const t = useTranslations("nav");

  return (
    <header
      className="h-16 flex items-center justify-between px-6 relative"
      style={{
        backgroundColor: "var(--color-header-background)",
        borderBottom: "1px solid var(--color-header-border)",
        boxShadow: "var(--shadow-header)",
      }}
    >
      {/* Left – Zuraio Logo */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/assets/260209_Zuraio_Logo_and_Claim.svg"
            alt="zuraio - own your data"
            width={200}
            height={61}
            className="h-8 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Center – Building2 Toggle (wie alt, h-6 w-6) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="h-8 w-8 p-0 rounded-md flex items-center justify-center transition-colors"
          style={{
            backgroundColor: sidebarOpen ? "#DCE6B5" : "transparent",
          }}
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
            className="h-5 w-5"
            style={{ color: "var(--color-gray-dark)" }}
          />
        </button>
      </div>

      {/* Right – Locale, Alerts, Logout, Zuraio Logo */}
      <div className="flex items-center gap-4">
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
          <span className="absolute top-1 right-1 h-4 w-4 bg-zuraio-loginAccent rounded-full text-xs flex items-center justify-center text-white font-medium">
            0
          </span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-3 py-2 text-sm font-medium rounded-md transition-colors"
          style={{ color: "var(--color-gray-dark)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#DCE6B5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {t("logout")}
        </button>
      </div>
    </header>
  );
}
