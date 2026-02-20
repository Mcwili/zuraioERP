"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  listSharePointItems,
  type SharePointDriveItem,
} from "@/server/actions/sharepoint-settings";
import { Folder, File, ExternalLink, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

export function SharePointExplorer() {
  const t = useTranslations("settings");
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folder");

  const [items, setItems] = useState<SharePointDriveItem[]>([]);
  const [driveId, setDriveId] = useState<string | null>(null);
  const [webUrl, setWebUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await listSharePointItems(folderId || undefined);
        if (cancelled) return;
        if (!result) {
          setError(t("sharePointExplorerNotConfigured"));
          setItems([]);
          return;
        }
        setItems(result.items);
        setDriveId(result.driveId);
        setWebUrl(result.webUrl || null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Unbekannter Fehler");
        setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [folderId, t]);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center py-16 gap-2"
        style={{ color: "#605e5c" }}
      >
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>{t("sharePointExplorerLoading")}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="p-4 rounded-lg border"
        style={{ borderColor: "#e1dfdd", backgroundColor: "#fff" }}
      >
        <p className="text-sm" style={{ color: "#605e5c" }}>
          {error}
        </p>
        <Link
          href="/dashboard/settings#sharepoint"
          className="mt-3 inline-block text-sm underline"
          style={{ color: "#9FAF52" }}
        >
          {t("sharePoint")} {t("sharePointNotConfigured")}
        </Link>
      </div>
    );
  }

  const folders = items.filter((i) => i.isFolder);
  const files = items.filter((i) => !i.isFolder);

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm flex-wrap" style={{ color: "#605e5c" }}>
        <Link
          href="/dashboard/sharepoint"
          className="hover:underline"
          style={{ color: "#9FAF52" }}
        >
          {t("sharePointExplorerRoot")}
        </Link>
        {folderId && (
          <>
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
            <span>{t("sharePointExplorerFolder")}</span>
          </>
        )}
      </div>

      {/* Open in SharePoint */}
      {webUrl && (
        <a
          href={webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm py-2 px-3 rounded-lg transition-colors w-fit"
          style={{
            backgroundColor: "rgba(159, 175, 82, 0.2)",
            color: "#000",
            border: "1px solid rgba(159, 175, 82, 0.5)",
          }}
        >
          <ExternalLink className="h-4 w-4" />
          {t("sharePointExplorerOpenInSharePoint")}
        </a>
      )}

      {/* Items table */}
      <div
        className="rounded-lg border overflow-hidden overflow-x-auto"
        style={{ borderColor: "#e1dfdd", backgroundColor: "#fff" }}
      >
        <table className="w-full min-w-[400px] text-sm">
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "1px solid #e1dfdd" }}>
              <th className="text-left py-3 px-4 font-medium" style={{ color: "#000" }}>
                {t("sharePointExplorerName")}
              </th>
              <th className="text-left py-3 px-4 font-medium" style={{ color: "#000" }}>
                {t("sharePointExplorerType")}
              </th>
              <th className="text-right py-3 px-4 font-medium" style={{ color: "#000" }}>
                {t("sharePointExplorerSize")}
              </th>
            </tr>
          </thead>
          <tbody>
            {folders.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-[rgba(159,175,82,0.08)]"
              >
                <td className="py-3 px-4">
                  <Link
                    href={`/dashboard/sharepoint?folder=${encodeURIComponent(item.id)}`}
                    className="flex items-center gap-2 hover:underline"
                    style={{ color: "#000" }}
                  >
                    <Folder className="h-4 w-4 flex-shrink-0" style={{ color: "#9FAF52" }} />
                    {item.name}
                  </Link>
                </td>
                <td className="py-3 px-4" style={{ color: "#605e5c" }}>
                  {t("sharePointExplorerFolder")}
                </td>
                <td className="py-3 px-4 text-right" style={{ color: "#605e5c" }}>
                  —
                </td>
              </tr>
            ))}
            {files.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 last:border-b-0 hover:bg-[rgba(159,175,82,0.08)]"
              >
                <td className="py-3 px-4">
                  {item.webUrl ? (
                    <a
                      href={item.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline"
                      style={{ color: "#000" }}
                    >
                      <File className="h-4 w-4 flex-shrink-0" style={{ color: "#605e5c" }} />
                      {item.name}
                    </a>
                  ) : (
                    <span className="flex items-center gap-2">
                      <File className="h-4 w-4 flex-shrink-0" style={{ color: "#605e5c" }} />
                      {item.name}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4" style={{ color: "#605e5c" }}>
                  {t("sharePointExplorerFile")}
                </td>
                <td className="py-3 px-4 text-right" style={{ color: "#605e5c" }}>
                  {item.size != null ? formatSize(item.size) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="py-12 text-center" style={{ color: "#605e5c" }}>
            {t("sharePointExplorerEmpty")}
          </div>
        )}
      </div>
    </div>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
