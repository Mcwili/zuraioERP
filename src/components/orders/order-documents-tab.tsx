"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { uploadOrderDocument } from "@/server/actions/documents";

interface Document {
  id: string;
  type: string;
  fileName: string;
  uploadedAt: Date | string;
}

interface OrderDocumentsTabProps {
  documents: Document[];
  orderId: string;
  organizationId: string;
}

const docTypeKeys: Record<string, string> = {
  CONTRACT: "docTypeContract",
  NDA: "docTypeNda",
  OFFER: "docTypeOffer",
  ORDER: "docTypeOrder",
  CORRESPONDENCE: "docTypeCorrespondence",
  TASK_ATTACHMENT: "docTypeTaskAttachment",
};

const ORDER_DOC_TYPES = ["CONTRACT", "NDA", "OFFER", "ORDER", "CORRESPONDENCE"] as const;

export function OrderDocumentsTab({
  documents,
  orderId,
  organizationId,
}: OrderDocumentsTabProps) {
  const t = useTranslations("orders");
  const tActions = useTranslations("actions");
  const router = useRouter();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const formatDate = (d: Date | string) => new Date(d).toLocaleDateString("de-CH");

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setPending(true);
    const formData = new FormData(e.currentTarget);
    try {
      await uploadOrderDocument(formData, orderId, organizationId);
      setUploadOpen(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload fehlgeschlagen");
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="flex justify-between items-center p-3 border-b" style={{ borderColor: "#e1dfdd" }}>
        <h3 className="font-semibold text-zuraio-text">{t("documents")}</h3>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded transition-colors hover:bg-[#DCE6B5]"
          style={{ color: "#9FAF52" }}
        >
          <Plus className="h-4 w-4" />
          {t("uploadDocument")}
        </button>
      </div>
      {documents.length === 0 ? (
        <div className="p-6 text-center text-zuraio-textMuted text-sm">
          {t("noDocuments")}
        </div>
      ) : (
        <ul className="divide-y" style={{ borderColor: "#e1dfdd" }}>
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="p-4 flex items-center justify-between transition-colors hover:bg-[#DCE6B5]"
            >
              <div>
                <span className="font-medium text-zuraio-text">{doc.fileName}</span>
                <span
                  className="ml-2 text-xs px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#f8f8f7", color: "#605e5c" }}
                >
                  {t(docTypeKeys[doc.type] || doc.type)}
                </span>
              </div>
              <span className="text-sm text-zuraio-textMuted">
                {formatDate(doc.uploadedAt)}
              </span>
            </li>
          ))}
        </ul>
      )}
      {uploadOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div
            className="w-full max-w-md rounded-lg shadow-xl overflow-hidden bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b" style={{ borderColor: "#e1dfdd" }}>
              <h3 className="text-lg font-semibold" style={{ color: "#1c1c1c" }}>
                {t("uploadDocument")}
              </h3>
            </div>
            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
                  {t("documentType")}
                </label>
                <select
                  name="type"
                  required
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  {ORDER_DOC_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {t(docTypeKeys[type])}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1">
                  {t("file")}
                </label>
                <input
                  name="file"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.jpg,.jpeg,.png,.gif,.webp"
                  className="w-full text-base py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-[#DCE6B5] file:text-black hover:file:opacity-90"
                />
                <p className="text-xs text-zuraio-textMuted mt-1">
                  {t("fileHint")}
                </p>
              </div>
              {error && (
                <div
                  className="p-3 rounded-lg text-sm"
                  style={{
                    backgroundColor: "rgba(209, 52, 56, 0.05)",
                    border: "1px solid rgba(209, 52, 56, 0.2)",
                    color: "#d13438",
                  }}
                >
                  {error}
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={pending}
                  className="px-4 py-2 rounded-md text-black font-medium disabled:opacity-50"
                  style={{ backgroundColor: "#9FAF52" }}
                >
                  {pending ? `${t("upload")}…` : t("upload")}
                </button>
                <button
                  type="button"
                  onClick={() => setUploadOpen(false)}
                  className="px-4 py-2 border rounded-md"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  {tActions("cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
