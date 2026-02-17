"use client";

import { useTranslations } from "next-intl";

interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  oldValues: unknown;
  newValues: unknown;
  createdAt: Date;
  user?: { name: string | null; email: string } | null;
}

interface OrderHistoryTabProps {
  auditLogs: AuditLogEntry[];
  orderId: string;
}

export function OrderHistoryTab({ auditLogs, orderId }: OrderHistoryTabProps) {
  const t = useTranslations("orders");

  const formatDate = (d: Date) =>
    d.toLocaleString("de-CH", {
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="p-3 border-b" style={{ borderColor: "#e1dfdd" }}>
        <h3 className="font-semibold text-zuraio-text">{t("history")}</h3>
      </div>
      {auditLogs.length === 0 ? (
        <div className="p-6 text-center text-zuraio-textMuted text-sm">
          {t("noHistory")}
        </div>
      ) : (
        <ul className="divide-y" style={{ borderColor: "#e1dfdd" }}>
          {auditLogs.map((log) => (
            <li
              key={log.id}
              className="p-4 transition-colors hover:bg-[#DCE6B5]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-zuraio-text">{log.action}</p>
                  <p className="text-sm text-zuraio-textMuted mt-1">
                    {log.user?.name || log.user?.email || "System"} –{" "}
                    {formatDate(log.createdAt)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
