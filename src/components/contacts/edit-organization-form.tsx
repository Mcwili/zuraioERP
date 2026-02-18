"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { updateOrganization, deleteOrganization } from "@/server/actions/organizations";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import type { Organization } from "@prisma/client";

export function EditOrganizationForm({ organization }: { organization: Organization }) {
  const t = useTranslations("contacts");
  const tActions = useTranslations("actions");
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError("");
    setPending(true);
    try {
      await updateOrganization(organization.id, {
        name: formData.get("name") as string,
        type: formData.get("type") as "CUSTOMER" | "PARTNER" | "SUPPLIER",
      });
      setOpen(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : t("saveError"));
    } finally {
      setPending(false);
    }
  }

  function handleDeleteClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setError("");
    setDeleteConfirmOpen(true);
  }

  async function handleDeleteConfirm() {
    setDeleting(true);
    setError("");
    try {
      await deleteOrganization(organization.id);
      setDeleteConfirmOpen(false);
      setOpen(false);
      router.push("/dashboard/contacts");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : t("deleteError"));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md transition-colors hover:bg-[#DCE6B5]"
        title={t("editOrganization")}
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
            className="w-full max-w-md rounded-lg shadow-xl overflow-hidden min-w-0 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b" style={{ borderColor: "#e1dfdd" }}>
              <h3 className="text-lg font-semibold" style={{ color: "#1c1c1c" }}>
                {t("editOrganization")}
              </h3>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(new FormData(e.currentTarget));
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("labelName")}
                </label>
                <input
                  name="name"
                  required
                  defaultValue={organization.name}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zuraio-textMuted mb-1.5">
                  {t("labelType")}
                </label>
                <select
                  name="type"
                  defaultValue={organization.type}
                  className="w-full px-3 py-2 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
                  style={{ borderColor: "#e1dfdd" }}
                >
                  <option value="CUSTOMER">{t("typeCustomer")}</option>
                  <option value="PARTNER">{t("typePartner")}</option>
                  <option value="SUPPLIER">{t("typeSupplier")}</option>
                </select>
              </div>
              {error && (
                <div
                  className="p-3 rounded-lg text-sm"
                  style={{
                    backgroundColor: "rgba(209, 52, 56, 0.05)",
                    border: "1px solid rgba(209, 52, 56, 0.2)",
                    color: "#d13438",
                  }}
                >
                  {error}
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  disabled={pending || deleting}
                  className="p-2 rounded-md transition-colors hover:bg-red-50 disabled:opacity-50"
                  style={{ color: "#605e5c" }}
                  title={t("deleteOrganization")}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={pending}
                    className="px-4 py-2 rounded-md text-black font-medium disabled:opacity-50"
                    style={{ backgroundColor: "#9FAF52" }}
                  >
                    {pending ? `${tActions("save")}…` : tActions("save")}
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
          onClick={() => !deleting && setDeleteConfirmOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-lg shadow-xl overflow-hidden bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b" style={{ borderColor: "#e1dfdd" }}>
              <h3 className="text-lg font-semibold" style={{ color: "#1c1c1c" }}>
                {t("deleteOrganization")}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-zuraio-textMuted">
                {t("deleteOrganizationConfirm", { name: organization.name })}
              </p>
              {error && (
                <div
                  className="p-3 rounded-lg text-sm"
                  style={{
                    backgroundColor: "rgba(209, 52, 56, 0.05)",
                    border: "1px solid rgba(209, 52, 56, 0.2)",
                    color: "#d13438",
                  }}
                >
                  {error}
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="px-4 py-2 rounded-md text-white font-medium disabled:opacity-50"
                  style={{ backgroundColor: "#d13438" }}
                >
                  {deleting ? "…" : tActions("delete")}
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmOpen(false)}
                  disabled={deleting}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
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
