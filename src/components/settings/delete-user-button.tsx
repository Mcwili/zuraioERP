"use client";

import { useState } from "react";
import { deleteUser } from "@/server/actions/users";
import { useTranslations } from "next-intl";
import { Trash2 } from "lucide-react";

export function DeleteUserButton({
  userId,
  email,
  canDelete,
}: {
  userId: string;
  email: string;
  canDelete: boolean;
}) {
  const t = useTranslations("settings");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setError("");
    try {
      await deleteUser(userId);
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fehler");
    }
  }

  if (!canDelete) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md transition-colors hover:bg-red-50"
        title={t("delete")}
      >
        <Trash2 className="h-4 w-4" style={{ color: "#d13438" }} />
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
                {t("deleteUser")}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-zuraio-textMuted">
                {t("deleteUserConfirm", { email })}
              </p>
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
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md text-white font-medium"
                  style={{ backgroundColor: "#d13438" }}
                >
                  {t("delete")}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
