"use client";

import { useState } from "react";
import { createAddress } from "@/server/actions/addresses";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export function CreateAddressForm({ organizationId }: { organizationId: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    await createAddress({
      organizationId,
      type: (formData.get("type") as "INVOICE" | "DELIVERY" | "HEADQUARTERS") ?? "INVOICE",
      street: (formData.get("street") as string) || undefined,
      postalCode: (formData.get("postalCode") as string) || undefined,
      city: (formData.get("city") as string) || undefined,
      country: (formData.get("country") as string) || "CH",
    });
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 text-sm hover:underline font-medium"
        style={{ color: "#9FAF52" }}
      >
        <Plus className="h-4 w-4" />
        Adresse hinzufügen
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
                Adresse hinzufügen
              </h3>
            </div>
            <form action={handleSubmit} className="p-6 space-y-4">
              <input type="hidden" name="organizationId" value={organizationId} />
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  Typ
                </label>
                <select
                  name="type"
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  <option value="INVOICE">Rechnungsadresse</option>
                  <option value="DELIVERY">Lieferadresse</option>
                  <option value="HEADQUARTERS">Standort</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  Strasse
                </label>
                <input
                  name="street"
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                    PLZ
                  </label>
                  <input
                    name="postalCode"
                    className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                    style={{ borderColor: "#e1dfdd" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                    Ort
                  </label>
                  <input
                    name="city"
                    className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                    style={{ borderColor: "#e1dfdd" }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  Land
                </label>
                <input
                  name="country"
                  defaultValue="CH"
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-black font-medium"
                  style={{ backgroundColor: "#9FAF52" }}
                >
                  Speichern
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
