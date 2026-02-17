"use client";

import { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      {/* Header – oben, volle Breite */}
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Area – wie alt: Panel (fixed) + Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Panel – fixed links unter Header, wie TenantAdminPanel */}
        <div
          className={`fixed left-0 top-16 bottom-0 z-40 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{
            width: "400px",
            maxWidth: "100%",
            boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content – marginLeft wenn Panel offen, wie alt */}
        <main
          className="flex-1 overflow-auto bg-white transition-all duration-300 p-6 min-w-0"
          style={{
            marginLeft: sidebarOpen ? "400px" : "0",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
