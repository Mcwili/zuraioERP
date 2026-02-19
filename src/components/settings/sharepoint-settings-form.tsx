"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  getSharePointStatus,
  updateSharePointSettings,
  testSharePointConnection,
} from "@/server/actions/sharepoint-settings";

interface SharePointSettingsFormProps {
  initialStatus: {
    configured: boolean;
    hasSiteId: boolean;
    hasDriveId: boolean;
    siteId: string | null;
    driveId: string | null;
  };
}

export function SharePointSettingsForm({ initialStatus }: SharePointSettingsFormProps) {
  const t = useTranslations("settings");
  const [siteId, setSiteId] = useState(initialStatus.siteId ?? "");
  const [driveId, setDriveId] = useState(initialStatus.driveId ?? "");
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSave() {
    setMessage(null);
    setSaving(true);
    try {
      await updateSharePointSettings(siteId || null, driveId || null);
      setMessage({ type: "success", text: t("sharePointSaved") });
    } catch (e) {
      setMessage({ type: "error", text: e instanceof Error ? e.message : "Fehler" });
    } finally {
      setSaving(false);
    }
  }

  async function handleTest() {
    setMessage(null);
    setTesting(true);
    try {
      const result = await testSharePointConnection();
      setMessage({
        type: result.success ? "success" : "error",
        text: result.message,
      });
    } catch (e) {
      setMessage({ type: "error", text: e instanceof Error ? e.message : "Fehler" });
    } finally {
      setTesting(false);
    }
  }

  return (
    <div
      className="rounded-lg border p-6 space-y-4"
      style={{ borderColor: "#e1dfdd", backgroundColor: "#fff" }}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold text-zuraio-text">{t("sharePoint")}</h3>
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            initialStatus.configured
              ? "bg-green-100 text-green-800"
              : "bg-zuraio-textMuted/20 text-zuraio-textMuted"
          }`}
        >
          {initialStatus.configured ? t("sharePointConfigured") : t("sharePointNotConfigured")}
        </span>
      </div>

      <p className="text-sm text-zuraio-textMuted">{t("sharePointAzureHint")}</p>

      <div>
        <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
          {t("sharePointSiteId")}
        </label>
        <input
          type="text"
          value={siteId}
          onChange={(e) => setSiteId(e.target.value)}
          placeholder="contoso.sharepoint.com,abc123,def456"
          className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
          style={{ borderColor: "#e1dfdd" }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
          {t("sharePointDriveId")}
        </label>
        <input
          type="text"
          value={driveId}
          onChange={(e) => setDriveId(e.target.value)}
          placeholder="b!..."
          className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
          style={{ borderColor: "#e1dfdd" }}
        />
      </div>

      {message && (
        <div
          className={`text-sm px-3 py-2 rounded ${
            message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50"
          style={{ backgroundColor: "#9FAF52", color: "#fff" }}
        >
          {saving ? t("sharePointSaving") : t("save")}
        </button>
        <button
          type="button"
          onClick={handleTest}
          disabled={testing}
          className="px-4 py-2 text-sm font-medium border rounded-md transition-colors disabled:opacity-50"
          style={{ borderColor: "#e1dfdd", color: "#1c1c1c" }}
        >
          {testing ? t("sharePointTesting") : t("sharePointTestConnection")}
        </button>
      </div>
    </div>
  );
}
