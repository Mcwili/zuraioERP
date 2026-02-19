"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { updateContactFromForm, deleteContact } from "@/server/actions/contacts";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type { Contact } from "@prisma/client";

export function EditContactForm({
  contact,
  organizationId,
}: {
  contact: Contact;
  organizationId: string;
}) {
  const t = useTranslations("contacts");
  const tActions = useTranslations("actions");
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    formData.set("organizationId", organizationId);
    await updateContactFromForm(contact.id, formData);
    setOpen(false);
    router.refresh();
  }

  function handleDeleteClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDeleteConfirmOpen(true);
  }

  async function handleDeleteConfirm() {
    try {
      await deleteContact(contact.id);
      setDeleteConfirmOpen(false);
      setOpen(false);
      router.push(`/dashboard/contacts/${organizationId}`);
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : t("deleteError"));
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md transition-colors hover:bg-[#DCE6B5]"
        title={tActions("edit")}
      >
        <Pencil className="h-4 w-4" style={{ color: "#9FAF52" }} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div
            className="w-full max-w-md rounded-lg shadow-xl overflow-hidden min-w-0 max-h-[90vh] flex flex-col"
            style={{ backgroundColor: "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b" style={{ borderColor: "#e1dfdd" }}>
              <h3 className="text-lg font-semibold" style={{ color: "#1c1c1c" }}>
                {t("editContact")}
              </h3>
            </div>
            <form action={handleSubmit} className="p-6 space-y-4 overflow-y-auto min-w-0">
              <input type="hidden" name="organizationId" value={organizationId} />
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("labelPhoto")}
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
                  {t("photoHint")}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("labelFirstName")}
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
                  {t("labelLastName")}
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
                  {t("labelEmail")}
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
                  {t("labelPhone")}
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
                  {t("labelRole")}
                </label>
                <select
                  name="role"
                  defaultValue={contact.role}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  <option value="BILLING">{t("roleBilling")}</option>
                  <option value="PROJECT_LEAD">{t("roleProjectLead")}</option>
                  <option value="PURCHASING">{t("rolePurchasing")}</option>
                  <option value="TECHNICAL">{t("roleTechnical")}</option>
                  <option value="MANAGEMENT">{t("roleManagement")}</option>
                  <option value="IT_LEAD">{t("roleItLead")}</option>
                  <option value="OTHER">{t("roleOther")}</option>
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
                  {t("primaryContactLabel")}
                </label>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="p-2 rounded-md transition-colors hover:bg-red-50"
                  style={{ color: "#605e5c" }}
                  title={t("deleteContact")}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md text-black font-medium"
                    style={{ backgroundColor: "#9FAF52" }}
                  >
                    {tActions("save")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 border rounded-md"
                    style={{ borderColor: "#e1dfdd" }}
                  >
                    {tActions("cancel")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="w-full max-w-md rounded-lg shadow-xl overflow-hidden bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b" style={{ borderColor: "#e1dfdd" }}>
              <h3 className="text-lg font-semibold" style={{ color: "#1c1c1c" }}>
                {t("deleteContact")}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-zuraio-textMuted">
                {t("deleteContactConfirm", {
                  name: [contact.firstName, contact.lastName].filter(Boolean).join(" ") || t("deleteContactFallback"),
                })}
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-md text-white font-medium"
                  style={{ backgroundColor: "#d13438" }}
                >
                  {tActions("delete")}
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="px-4 py-2 border rounded-md"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  {tActions("cancel")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
