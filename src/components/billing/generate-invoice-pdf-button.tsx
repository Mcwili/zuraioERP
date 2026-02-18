"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FileDown } from "lucide-react";
import { generateInvoicePdf } from "@/server/actions/invoices";

interface GenerateInvoicePdfButtonProps {
  invoiceId: string;
  hasOrder: boolean;
}

export function GenerateInvoicePdfButton({
  invoiceId,
  hasOrder,
}: GenerateInvoicePdfButtonProps) {
  const t = useTranslations("billing");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (!hasOrder) {
      setError("Rechnung muss einem Auftrag zugeordnet sein.");
      return;
    }
    setError("");
    setPending(true);
    try {
      await generateInvoicePdf(invoiceId);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fehler beim Generieren");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending || !hasOrder}
        className="flex items-center gap-2 px-4 py-2 rounded-md text-black font-medium disabled:opacity-50 transition-colors hover:opacity-90"
        style={{ backgroundColor: "#9FAF52" }}
      >
        <FileDown className="h-4 w-4" />
        {pending ? "…" : t("generatePdf")}
      </button>
      {!hasOrder && (
        <p className="text-xs text-zuraio-textMuted">
          {t("generatePdfRequiresOrder")}
        </p>
      )}
      {error && (
        <p className="text-sm" style={{ color: "#d13438" }}>
          {error}
        </p>
      )}
    </div>
  );
}
