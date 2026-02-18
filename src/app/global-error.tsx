"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="de">
      <body className="antialiased">
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-6">
          <h1 className="text-lg font-semibold">Ein unerwarteter Fehler ist aufgetreten</h1>
          <p className="text-sm text-zuraio-textMuted max-w-md text-center">{error.message}</p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 text-sm rounded border bg-white hover:bg-[#f8f8f7]"
            style={{ borderColor: "#e1dfdd" }}
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
