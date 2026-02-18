"use client";

import { useEffect } from "react";

export default function OrdersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Orders page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4 p-6">
      <p className="text-zuraio-textMuted text-sm">
        Beim Laden der Aufträge ist ein Fehler aufgetreten.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 text-sm rounded border bg-white hover:bg-[#f8f8f7]"
        style={{ borderColor: "#e1dfdd" }}
      >
        Erneut versuchen
      </button>
    </div>
  );
}
