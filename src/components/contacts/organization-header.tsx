"use client";

import { Building2, Camera } from "lucide-react";
import { useTranslations } from "next-intl";
import { uploadOrganizationLogo } from "@/server/actions/organizations";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditOrganizationForm } from "./edit-organization-form";
import type { Organization } from "@prisma/client";

export function OrganizationHeader({ organization }: { organization: Organization }) {
  const t = useTranslations("contacts");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.get("logo") || (formData.get("logo") as File).size === 0) return;
    setError("");
    setUploading(true);
    try {
      await uploadOrganizationLogo(organization.id, formData);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : t("uploadError"));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="p-6 rounded-lg border flex flex-col sm:flex-row gap-6 items-start min-w-0 overflow-hidden"
      style={{ borderColor: "#e1dfdd", backgroundColor: "white" }}
    >
      {/* Logo */}
      <form onSubmit={handleLogoSubmit} className="flex flex-col items-center gap-2 flex-shrink-0">
        <div className="relative">
          {organization.logoUrl ? (
            <div
              className="w-24 h-24 rounded-lg border flex items-center justify-center overflow-hidden p-1"
              style={{ borderColor: "#e1dfdd", backgroundColor: "#f8f8f7" }}
            >
              <img
                src={organization.logoUrl}
                alt={organization.name}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-lg flex items-center justify-center border"
              style={{ backgroundColor: "#DCE6B5", borderColor: "#e1dfdd", color: "#1c1c1c" }}
            >
              <Building2 className="h-12 w-12" />
            </div>
          )}
          <label
            className="absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-[#9FAF52]"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}
          >
            <Camera className="h-4 w-4" />
            <input
              type="file"
              name="logo"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              className="sr-only"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  e.target.closest("form")?.requestSubmit();
                }
              }}
            />
          </label>
        </div>
        <p className="text-xs text-zuraio-textMuted">{t("logoHint")}</p>
        {error && <p className="text-xs" style={{ color: "#d13438" }}>{error}</p>}
        {uploading && <p className="text-xs text-zuraio-textMuted">{t("uploading")}</p>}
      </form>

      {/* Name, ID, Klassifizierung */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-zuraio-text mb-1">
              {organization.name}
            </h2>
            <p className="text-sm text-zuraio-textMuted font-mono" title="Organisations-ID">
              ID: {organization.id}
            </p>
            <p className="text-sm text-zuraio-textMuted mt-2">
              {organization.type === "CUSTOMER" ? t("typeCustomer") : organization.type === "PARTNER" ? t("typePartner") : t("typeSupplier")}
            </p>
          </div>
          <EditOrganizationForm organization={organization} />
        </div>
      </div>
    </div>
  );
}
