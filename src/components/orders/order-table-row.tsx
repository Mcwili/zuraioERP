"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface OrderTableRowProps {
  order: {
    id: string;
    orderNumber: string | null;
    projectName: string | null;
    status: string;
    organization: { name: string };
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const t = useTranslations("orders");
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(`/dashboard/orders/${order.id}`)}
      className="border-t transition-colors hover:bg-[#DCE6B5] cursor-pointer"
      style={{ borderColor: "#e1dfdd" }}
    >
      <td className="px-3 py-2 font-medium text-zuraio-text tabular-nums w-24">
        {order.orderNumber || "–"}
      </td>
      <td className="px-3 py-2 max-w-0">
        <span className="font-medium text-zuraio-text block truncate">
          {order.projectName || order.orderNumber || order.organization.name}
        </span>
      </td>
      <td className="px-3 py-2 text-zuraio-textMuted text-xs max-w-0">
        <span className="block truncate">{order.organization.name}</span>
      </td>
      <td className="px-3 py-2 whitespace-nowrap" style={{ width: "1%" }}>
        <span
          className="inline-block px-2 py-0.5 rounded text-xs font-medium"
          style={{
            backgroundColor:
              order.status === "ACTIVE"
                ? "#DCE6B5"
                : order.status === "COMPLETED"
                  ? "#e5e7eb"
                  : "#f8f8f7",
            color: "#1c1c1c",
          }}
        >
          {t(`status${String(order.status).charAt(0) + String(order.status).slice(1).toLowerCase()}`)}
        </span>
      </td>
      <td className="px-2 py-2">
        <Link
          href={`/dashboard/orders/${order.id}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center justify-center w-7 h-7 rounded transition-colors hover:bg-[#DCE6B5]"
          style={{ color: "#9FAF52" }}
          title="Öffnen"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </td>
    </tr>
  );
}
