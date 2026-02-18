"use client";

import { useState } from "react";
import Image from "next/image";
import { updateProfileImage } from "@/server/actions/users";
import { ChangePasswordForm } from "./change-password-form";
import { useTranslations } from "next-intl";
import { Camera } from "lucide-react";

export function ProfileSection({
  userId,
  email,
  name,
  imageUrl,
}: {
  userId: string;
  email: string;
  name: string | null;
  imageUrl?: string | null;
}) {
  const t = useTranslations("settings");
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState<string | null>(imageUrl ?? null);

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    const formData = new FormData();
    formData.set("photo", file);

    try {
      const result = await updateProfileImage(formData);
      if (result.imageUrl) {
        setCurrentImage(result.imageUrl);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Fehler");
    }
    e.target.value = "";
  }

  return (
    <section>
      <h2 className="font-semibold text-zuraio-text mb-3">{t("myProfile")}</h2>
      <div
        className="p-6 rounded-lg border flex flex-col sm:flex-row gap-6 items-center sm:items-start"
        style={{ borderColor: "#e1dfdd", backgroundColor: "#fff" }}
      >
        <div className="flex items-center gap-4 flex-1">
          <label className="relative cursor-pointer group">
            <div
              className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 border-2 border-[#e1dfdd] transition-all group-hover:border-[#9FAF52]"
              style={{ backgroundColor: "#DCE6B5" }}
            >
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={name || email}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-2xl font-semibold" style={{ color: "#1c1c1c" }}>
                  {name?.[0] || email[0]?.toUpperCase() || "?"}
                </span>
              )}
            </div>
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            >
              <Camera className="h-8 w-8 text-white" />
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
          <div>
            <p className="font-medium text-zuraio-text">{name || email}</p>
            <p className="text-sm text-zuraio-textMuted">{email}</p>
            <p className="text-xs text-zuraio-textMuted mt-1">
              {t("photoHint")}
            </p>
            {error && (
              <p className="text-sm mt-1" style={{ color: "#d13438" }}>
                {error}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <ChangePasswordForm userId={userId} showCurrentPassword={true} />
        </div>
      </div>
    </section>
  );
}
