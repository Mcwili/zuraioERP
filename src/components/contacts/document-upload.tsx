"use client";

import { useState } from "react";
import { uploadOrganizationDocument } from "@/server/actions/documents";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

export function DocumentUpload({ organizationId }: { organizationId: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError("");
    setLoading(true);
    try {
      await uploadOrganizationDocument(formData);
      setOpen(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-sm hover:underline font-medium"
        style={{ color: "#9FAF52" }}
      >
        <Upload className="h-4 w-4" />
        Dokument hochladen
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-lg shadow-xl overflow-hidden"
            style={{ backgroundColor: "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b" style={{ borderColor: "#e1dfdd" }}>
              <h3 className="text-lg font-semibold" style={{ color: "#1c1c1c" }}>
                Dokument hochladen
              </h3>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSubmit(new FormData(e.currentTarget));
              }}
              className="p-6 space-y-4"
            >
              <input type="hidden" name="organizationId" value={organizationId} />
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  Dokumenttyp
                </label>
                <select
                  name="type"
                  required
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  <option value="CONTRACT">Vertrag</option>
                  <option value="NDA">NDA</option>
                  <option value="CORRESPONDENCE">Korrespondenz</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  Datei (PDF, DOC, DOCX, max 10 MB)
                </label>
                <input
                  name="file"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="w-full text-base py-2"
                />
              </div>
              {error && (
                <div
                  className="p-3 rounded-lg border flex items-center gap-2"
                  style={{
                    background: "rgba(209, 52, 56, 0.05)",
                    borderColor: "rgba(209, 52, 56, 0.2)",
                    color: "#d13438",
                  }}
                >
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-md disabled:opacity-50 text-black font-medium"
                  style={{ backgroundColor: "#9FAF52" }}
                >
                  {loading ? "Hochladen..." : "Hochladen"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded-md"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  Abbrechen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
