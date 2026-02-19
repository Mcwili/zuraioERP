"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { uploadExpenseReceipt } from "@/server/actions/documents";

interface ExpenseDocumentUploadProps {
  expenseActualCostId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function ExpenseDocumentUpload({
  expenseActualCostId,
  onClose,
  onSuccess,
}: ExpenseDocumentUploadProps) {
  const t = useTranslations("expenses");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      await uploadExpenseReceipt(formData, expenseActualCostId);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("uploadFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div
        className="w-full max-w-md rounded-lg shadow-xl overflow-hidden bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b" style={{ borderColor: "#e1dfdd" }}>
          <h3 className="text-lg font-semibold text-zuraio-text">{t("addDocument")}</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
              {t("fileHint")}
            </label>
            <input
              name="file"
              type="file"
              required
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.jpg,.jpeg,.png,.gif,.webp"
              className="w-full text-sm py-2"
            />
          </div>
          {error && (
            <div
              className="p-3 rounded-lg border text-sm text-red-600"
              style={{
                background: "rgba(209, 52, 56, 0.05)",
                borderColor: "rgba(209, 52, 56, 0.2)",
              }}
            >
              {error}
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md disabled:opacity-50 text-black font-medium"
              style={{ backgroundColor: "#9FAF52" }}
            >
              {loading ? `${t("upload")}…` : t("upload")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
              style={{ borderColor: "#e1dfdd" }}
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
