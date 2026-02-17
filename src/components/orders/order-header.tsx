import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Order, Organization, User, Contact } from "@prisma/client";

interface OrderHeaderProps {
  order: Order & {
    organization: Organization;
    accountOwner?: Pick<User, "id" | "name" | "email"> | null;
    projectLead?: Pick<Contact, "id" | "firstName" | "lastName" | "email"> | null;
  };
}

const statusColors: Record<string, string> = {
  DRAFT: "#9e9e9e",
  ACTIVE: "#9FAF52",
  PAUSED: "#f59e0b",
  COMPLETED: "#4b5563",
};

const contractTypeKeys: Record<string, string> = {
  PROJECT: "contractTypeProject",
  LICENSE: "contractTypeLicense",
  MIXED: "contractTypeMixed",
};

export function OrderHeader({ order }: OrderHeaderProps) {
  const t = useTranslations("orders");

  const formatDate = (d: Date) => d.toLocaleDateString("de-CH");
  const formatCurrency = (val: number | null | undefined) =>
    val != null ? `${Number(val).toLocaleString("de-CH")} ${order.currency || "CHF"}` : "–";

  return (
    <div
      className="p-4 rounded-lg border bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-sm">
        <div>
          <span className="text-zuraio-textMuted block text-xs">{t("orderNumber")}</span>
          <span className="font-medium text-zuraio-text">{order.orderNumber || "–"}</span>
        </div>
        <div>
          <span className="text-zuraio-textMuted block text-xs">{t("customer")}</span>
          <Link
            href={`/dashboard/contacts/${order.organizationId}`}
            className="font-medium text-zuraio-text hover:underline"
          >
            {order.organization.name}
          </Link>
        </div>
        <div>
          <span className="text-zuraio-textMuted block text-xs">{t("projectName")}</span>
          <span className="font-medium text-zuraio-text">{order.projectName || "–"}</span>
        </div>
        <div>
          <span className="text-zuraio-textMuted block text-xs">{t("status")}</span>
          <span
            className="inline-block px-2 py-0.5 rounded text-xs font-medium"
            style={{
              backgroundColor: `${statusColors[order.status] || "#9e9e9e"}33`,
              color: statusColors[order.status] || "#4b5563",
            }}
          >
            {t(`status${order.status.charAt(0) + order.status.slice(1).toLowerCase()}`)}
          </span>
        </div>
        <div>
          <span className="text-zuraio-textMuted block text-xs">{t("contractType")}</span>
          <span className="font-medium text-zuraio-text">
            {t(contractTypeKeys[order.contractType] || "contractTypeProject")}
          </span>
        </div>
        <div>
          <span className="text-zuraio-textMuted block text-xs">{t("startDate")}</span>
          <span className="font-medium text-zuraio-text">{formatDate(order.startDate)}</span>
        </div>
        <div>
          <span className="text-zuraio-textMuted block text-xs">{t("endDate")}</span>
          <span className="font-medium text-zuraio-text">
            {order.endDate ? formatDate(order.endDate) : "–"}
          </span>
        </div>
        <div>
          <span className="text-zuraio-textMuted block text-xs">{t("totalValue")}</span>
          <span className="font-medium text-zuraio-text">
            {formatCurrency(order.totalValue ? Number(order.totalValue) : null)}
          </span>
        </div>
        <div>
          <span className="text-zuraio-textMuted block text-xs">{t("accountOwner")}</span>
          <span className="font-medium text-zuraio-text">
            {order.accountOwner?.name || order.accountOwner?.email || "–"}
          </span>
        </div>
        <div>
          <span className="text-zuraio-textMuted block text-xs">{t("projectLead")}</span>
          <span className="font-medium text-zuraio-text">
            {order.projectLead
              ? `${order.projectLead.firstName} ${order.projectLead.lastName}`
              : "–"}
          </span>
        </div>
        {order.currency && (
          <div>
            <span className="text-zuraio-textMuted block text-xs">{t("currency")}</span>
            <span className="font-medium text-zuraio-text">{order.currency}</span>
          </div>
        )}
        {order.paymentTerms && (
          <div>
            <span className="text-zuraio-textMuted block text-xs">{t("paymentTerms")}</span>
            <span className="font-medium text-zuraio-text">{order.paymentTerms}</span>
          </div>
        )}
        {order.internalProjectNumber && (
          <div>
            <span className="text-zuraio-textMuted block text-xs">{t("internalProjectNumber")}</span>
            <span className="font-medium text-zuraio-text">{order.internalProjectNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
}
