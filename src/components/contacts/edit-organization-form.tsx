"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { updateOrganization } from "@/server/actions/organizations";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import type { Organization } from "@prisma/client";

export function EditOrganizationForm({ organization }: { organization: Organization }) {
  const t = useTranslations("contacts");
  const tActions = useTranslations("actions");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
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
              <div className="flex gap-3 pt-2">
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
            </form>
          </div>
        </div>
      )}
    </>
  );
}
