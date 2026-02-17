import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessProducts } from "@/lib/permissions";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Plus, Package } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";

export default async function ProductsPage() {
  const t = await getTranslations("products");
  const session = await getServerSession(authOptions);
  if (!session || !canAccessProducts(session.user.role)) {
    return <p>Nicht berechtigt</p>;
  }

  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { prices: true } } },
  });

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner
        title={t("title")}
        icon={Package}
        actions={
          <Link
            href="/dashboard/products/new"
            className="flex items-center justify-center p-2 rounded-md transition-colors hover:bg-[rgba(0,0,0,0.12)]"
            style={{
              backgroundColor: "rgba(0,0,0,0.08)",
              color: "#000000",
              border: "1px solid rgba(0,0,0,0.12)",
            }}
            title="Produkt"
          >
            <Plus className="h-5 w-5" />
          </Link>
        }
      />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
      <div className="bg-white rounded-lg overflow-hidden border" style={{ borderColor: "#e1dfdd" }}>
        <table className="w-full">
          <thead className="bg-zuraio-sidebar" style={{ borderBottom: "1px solid #e1dfdd" }}>
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-zuraio-text">
                Name
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-zuraio-text">
                Typ
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-zuraio-text">
                MWST
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-t transition-colors hover:bg-[#DCE6B5]"
                style={{ borderColor: "#e1dfdd" }}
              >
                <td className="px-4 py-3 font-medium text-zuraio-text">
                  {p.name}
                </td>
                <td className="px-4 py-3 text-zuraio-textMuted text-sm">
                  {p.type}
                </td>
                <td className="px-4 py-3 text-zuraio-textMuted text-sm">
                  {Number(p.vatRate)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="px-4 py-12 text-center text-zuraio-textMuted">
            Keine Produkte. Erstellen Sie ein neues Produkt.
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
