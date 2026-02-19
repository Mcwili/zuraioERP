"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function OrderDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors");
  const tCommon = useTranslations("common");
  useEffect(() => {
    console.error("Order detail error:", error);
  }, [error]);

  const isWebpackCallError =
    error?.message?.includes("reading 'call'") ?? false;

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 p-6">
      <p className="text-zuraio-textMuted text-sm">{t("orderLoadError")}</p>
      {isWebpackCallError && (
        <p className="text-xs text-zuraio-textMuted max-w-md text-center">
          {t("webpackReloadHint")}
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 text-sm rounded border bg-white hover:bg-[#f8f8f7]"
          style={{ borderColor: "#e1dfdd" }}
        >
          {t("tryAgain")}
        </button>
        <Link
          href="/dashboard/orders"
          className="px-4 py-2 text-sm rounded border bg-white hover:bg-[#f8f8f7]"
          style={{ borderColor: "#e1dfdd" }}
        >
          {tCommon("actions.backToList")}
        </Link>
      </div>
    </div>
  );
}
