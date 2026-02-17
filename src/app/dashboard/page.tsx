import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  LayoutDashboard,
  Users,
  FileText,
  Receipt,
} from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";

export default async function DashboardPage() {
  const t = await getTranslations("app");
  const tNav = await getTranslations("nav");

  const [contactsCount, ordersCount, invoicesCount] = await Promise.all([
    prisma.contact.count(),
    prisma.order.count(),
    prisma.invoice.count(),
  ]);

  const cards = [
    {
      href: "/dashboard/contacts",
      label: tNav("customers"),
      count: contactsCount,
      icon: Users,
    },
    {
      href: "/dashboard/orders",
      label: tNav("orders"),
      count: ordersCount,
      icon: FileText,
    },
    {
      href: "/dashboard/billing",
      label: tNav("invoices"),
      count: invoicesCount,
      icon: Receipt,
    },
  ];

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("dashboard")} icon={LayoutDashboard} />

      {/* Content – wie alt: px-4 sm:px-6 md:px-8 pt-8 pb-8, max-w-7xl mx-auto */}
      <div className="px-4 sm:px-6 md:px-8 pt-8 pb-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map(({ href, label, count, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="block p-4 rounded-lg transition-colors cursor-pointer border border-[#e1dfdd] bg-white hover:bg-[#DCE6B5]"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 flex-shrink-0" style={{ color: "#4A4D50" }} />
                <span className="font-medium text-sm" style={{ color: "#1c1c1c" }}>
                  {label}
                </span>
              </div>
              <p className="mt-2 text-2xl font-semibold" style={{ color: "#1c1c1c" }}>
                {count}
              </p>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm" style={{ color: "#605e5c" }}>
          {t("welcomeSubtitle")}
        </p>
      </div>
    </div>
  );
}
