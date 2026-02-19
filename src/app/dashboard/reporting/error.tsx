"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function ReportingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors");

  useEffect(() => {
    console.error("Reporting page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 p-6">
      <p className="text-zuraio-textMuted text-sm">
        {t("generic")}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 text-sm rounded border bg-white hover:bg-[#f8f8f7]"
        style={{ borderColor: "#e1dfdd" }}
      >
        {t("tryAgain")}
      </button>
    </div>
  );
}
