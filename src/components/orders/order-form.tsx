"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import type { Organization } from "@prisma/client";

export function OrderForm({
  action,
  organizations,
}: {
  action: (formData: FormData) => Promise<void>;
  organizations: Organization[];
}) {
  const t = useTranslations("orders");
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => startTransition(() => action(fd))}
      className="max-w-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-zuraio-text mb-1">
          Organisation
        </label>
        <select
          name="organizationId"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
          style={{ borderColor: "#e1dfdd" }}
        >
          <option value="">Wählen...</option>
          {organizations.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
      <p className="text-xs text-zuraio-textMuted">
        {t("orderNumberOnAssignHint")}
      </p>
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 rounded-md disabled:opacity-50 text-black font-medium hover:opacity-90"
        style={{ backgroundColor: "#9FAF52" }}
      >
        {isPending ? "..." : t("createOrder")}
      </button>
    </form>
  );
}
