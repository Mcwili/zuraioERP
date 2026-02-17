"use client";

import { useTransition } from "react";

export function ProductForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => startTransition(() => action(fd))}
      className="max-w-md space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-zuraio-text mb-1">
          Name
        </label>
        <input
          name="name"
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
          style={{ borderColor: "#e1dfdd" }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zuraio-text mb-1">
          Typ
        </label>
        <select
          name="type"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
          style={{ borderColor: "#e1dfdd" }}
        >
          <option value="LICENSE">Lizenz</option>
          <option value="SERVICE">Service</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-zuraio-text mb-1">
          MWST %
        </label>
        <input
          name="vatRate"
          type="number"
          step="0.01"
          defaultValue="0"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
          style={{ borderColor: "#e1dfdd" }}
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 rounded-md disabled:opacity-50 text-black font-medium hover:opacity-90"
        style={{ backgroundColor: "#9FAF52" }}
      >
        {isPending ? "Speichern..." : "Speichern"}
      </button>
    </form>
  );
}
