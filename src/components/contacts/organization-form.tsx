"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type OrganizationFormProps = {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: {
    name?: string;
    type?: string;
  };
  cancelHref?: string;
};

export function OrganizationForm({ action, defaultValues, cancelHref }: OrganizationFormProps) {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("actions");

  return (
    <form
      action={(fd) => startTransition(() => action(fd))}
      className="max-w-md space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-zuraio-text mb-1"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={defaultValues?.name}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
          style={{ borderColor: "#e1dfdd" }}
        />
      </div>
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-zuraio-text mb-1"
        >
          Typ
        </label>
        <select
          id="type"
          name="type"
          defaultValue={defaultValues?.type ?? "CUSTOMER"}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
          style={{ borderColor: "#e1dfdd" }}
        >
          <option value="CUSTOMER">Kunde</option>
          <option value="PARTNER">Partner</option>
          <option value="SUPPLIER">Lieferant</option>
        </select>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-md hover:opacity-90 disabled:opacity-50 text-black font-medium"
          style={{ backgroundColor: "#9FAF52" }}
        >
          {isPending ? "Speichern..." : "Speichern"}
        </button>
        {cancelHref && (
          <Link
            href={cancelHref}
            className="px-4 py-2 rounded-md text-black font-medium border"
            style={{ borderColor: "#e1dfdd" }}
          >
            {t("cancel")}
          </Link>
        )}
      </div>
    </form>
  );
}
