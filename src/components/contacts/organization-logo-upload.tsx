"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, Camera } from "lucide-react";
import { uploadOrganizationLogo } from "@/server/actions/organizations";
import { useRouter } from "next/navigation";

export function OrganizationLogoUpload({
  organizationId,
  logoUrl,
  name,
}: {
  organizationId: string;
  logoUrl: string | null;
  name: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!formData.get("logo") || (formData.get("logo") as File).size === 0) return;
    setError("");
    setUploading(true);
    try {
      await uploadOrganizationLogo(organizationId, formData);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fehler beim Hochladen");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-start gap-4 mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
        <div className="relative">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-lg object-cover border"
              style={{ borderColor: "#e1dfdd" }}
              unoptimized
            />
          ) : (
            <div
              className="w-20 h-20 rounded-lg flex items-center justify-center border"
              style={{ backgroundColor: "#DCE6B5", borderColor: "#e1dfdd", color: "#1c1c1c" }}
            >
              <Building2 className="h-10 w-10" />
            </div>
          )}
          <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-[#9FAF52]"
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
        <p className="text-xs text-zuraio-textMuted">JPEG, PNG, WebP oder SVG, max. 2 MB</p>
        {error && (
          <p className="text-xs" style={{ color: "#d13438" }}>
            {error}
          </p>
        )}
        {uploading && (
          <p className="text-xs text-zuraio-textMuted">Wird hochgeladen…</p>
        )}
      </form>
    </div>
  );
}
