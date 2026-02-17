"use client";

import { useTranslations } from "next-intl";

interface Document {
  id: string;
  type: string;
  fileName: string;
  uploadedAt: Date;
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
};

export function OrderDocumentsTab({
  documents,
  orderId,
  organizationId,
}: OrderDocumentsTabProps) {
  const t = useTranslations("orders");

  const formatDate = (d: Date) => d.toLocaleDateString("de-CH");

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="flex justify-between items-center p-3 border-b" style={{ borderColor: "#e1dfdd" }}>
        <h3 className="font-semibold text-zuraio-text">{t("documents")}</h3>
        <button
          type="button"
          className="text-xs px-2 py-1 rounded transition-colors hover:bg-[#DCE6B5]"
          style={{ color: "#9FAF52" }}
        >
          Dokument hochladen
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
    </div>
  );
}
