"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function OrderDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Order detail error:", error);
  }, [error]);

  const isWebpackCallError =
    error?.message?.includes("reading 'call'") ?? false;

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 p-6">
      <p className="text-zuraio-textMuted text-sm">Beim Laden des Auftrags ist ein Fehler aufgetreten.</p>
      {isWebpackCallError && (
        <p className="text-xs text-zuraio-textMuted max-w-md text-center">
          Dies kann nach einem Update auftreten. Bitte laden Sie die Seite neu (F5 oder Strg+R).
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => reset()}
          className="px-4 py-2 text-sm rounded border bg-white hover:bg-[#f8f8f7]"
          style={{ borderColor: "#e1dfdd" }}
        >
          Erneut versuchen
        </button>
        <Link
          href="/dashboard/orders"
          className="px-4 py-2 text-sm rounded border bg-white hover:bg-[#f8f8f7]"
          style={{ borderColor: "#e1dfdd" }}
        >
          Zurück zur Liste
        </Link>
      </div>
    </div>
  );
}
