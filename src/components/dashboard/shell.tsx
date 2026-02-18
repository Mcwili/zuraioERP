"use client";

import { useState, useEffect } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

type UserProfile = { id: string; email: string; name: string | null; imageUrl: string | null } | null;

export function DashboardShell({
  children,
  userProfile,
}: {
  children: React.ReactNode;
  userProfile: UserProfile;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        userProfile={userProfile}
      />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile: Overlay mit Backdrop; Desktop: Sidebar links */}
        {/* Backdrop nur auf Mobile sichtbar wenn Menü offen */}
        <div
          className={`md:hidden fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        {/* Sidebar – ein-/ausklappbar per ChevronLeft oder Hamburger */}
        <div
          className={`fixed left-0 top-16 bottom-0 z-40 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            width: "min(280px, 85vw)",
            maxWidth: "100%",
            boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Sidebar
            onClose={() => setSidebarOpen(false)}
            closeOnLinkClick={isMobile}
          />
        </div>

        {/* Main Content – Mobile: volle Breite; Desktop: marginLeft wenn Sidebar offen */}
        <main
          className={`flex-1 overflow-auto overflow-x-hidden bg-white transition-all duration-300 p-4 md:p-6 min-w-0 z-0 ${
            sidebarOpen ? "md:ml-[280px]" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
