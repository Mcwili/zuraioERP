"use client";

import { useState } from "react";
import { createUser } from "@/server/actions/users";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import type { Role } from "@prisma/client";

const ROLES: { value: Role; label: string }[] = [
  { value: "ADMIN", label: "Admin" },
  { value: "SALES", label: "Vertrieb" },
  { value: "PROJECT_LEAD", label: "Projektleitung" },
  { value: "FINANCE", label: "Finanzen" },
  { value: "DELIVERY", label: "Lieferung" },
  { value: "MANAGEMENT", label: "Management" },
];

export function CreateUserForm() {
  const t = useTranslations("settings");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setError("");
    try {
      await createUser(formData);
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fehler");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-sm hover:underline font-medium"
        style={{ color: "#9FAF52" }}
      >
        <Plus className="h-4 w-4" />
        {t("addUser")}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div
            className="w-full max-w-md rounded-lg shadow-xl overflow-hidden"
            style={{ backgroundColor: "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b" style={{ borderColor: "#e1dfdd" }}>
              <h3 className="text-lg font-semibold" style={{ color: "#1c1c1c" }}>
                {t("addUser")}
              </h3>
            </div>
            <form action={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("email")}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("password")}
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
                <p className="text-xs text-zuraio-textMuted mt-1">
                  {t("minPasswordLength")}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("name")}
                </label>
                <input
                  name="name"
                  type="text"
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("role")}
                </label>
                <select
                  name="role"
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              {error && (
                <div
                  className="p-3 rounded-lg text-sm"
                  style={{
                    backgroundColor: "rgba(209, 52, 56, 0.05)",
                    borderColor: "rgba(209, 52, 56, 0.2)",
                    border: "1px solid",
                    color: "#d13438",
                  }}
                >
                  {error}
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-black font-medium"
                  style={{ backgroundColor: "#9FAF52" }}
                >
                  {t("create")}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded-md"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  {t("cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
