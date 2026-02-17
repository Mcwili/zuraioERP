"use client";

import { useState } from "react";
import Image from "next/image";
import { updateContactFromForm } from "@/server/actions/contacts";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import type { Contact } from "@prisma/client";

export function EditContactForm({
  contact,
  organizationId,
}: {
  contact: Contact;
  organizationId: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    formData.set("organizationId", organizationId);
    await updateContactFromForm(contact.id, formData);
    setOpen(false);
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md transition-colors hover:bg-[#DCE6B5]"
        title="Bearbeiten"
      >
        <Pencil className="h-4 w-4" style={{ color: "#9FAF52" }} />
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
                Kontakt bearbeiten
              </h3>
            </div>
            <form action={handleSubmit} className="p-6 space-y-4">
              <input type="hidden" name="organizationId" value={organizationId} />
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  Foto
                </label>
                {contact.photoUrl && (
                  <div className="mb-2">
                    <Image
                      src={contact.photoUrl}
                      alt={`${contact.firstName} ${contact.lastName}`}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <input
                  name="photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="w-full text-base py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#9FAF52] file:text-black file:cursor-pointer"
                />
                <p className="text-xs text-zuraio-textMuted mt-1">
                  JPEG, PNG oder WebP, max. 2 MB
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  Vorname
                </label>
                <input
                  name="firstName"
                  required
                  defaultValue={contact.firstName}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  Nachname
                </label>
                <input
                  name="lastName"
                  required
                  defaultValue={contact.lastName}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  E-Mail
                </label>
                <input
                  name="email"
                  type="email"
                  defaultValue={contact.email ?? ""}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  Telefon
                </label>
                <input
                  name="phone"
                  defaultValue={contact.phone ?? ""}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  Rolle
                </label>
                <select
                  name="role"
                  defaultValue={contact.role}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  <option value="BILLING">Rechnung</option>
                  <option value="PROJECT_LEAD">Projektleitung</option>
                  <option value="PURCHASING">Einkauf</option>
                  <option value="TECHNICAL">Technisch</option>
                  <option value="OTHER">Sonstige</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isPrimary"
                  id={`isPrimary-${contact.id}`}
                  defaultChecked={contact.isPrimary}
                  className="rounded"
                />
                <label htmlFor={`isPrimary-${contact.id}`} className="text-sm text-zuraio-textMuted">
                  Hauptansprechpartner
                </label>
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
