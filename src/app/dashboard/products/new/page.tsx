import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessProducts } from "@/lib/permissions";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/products/product-form";
import { PageBanner } from "@/components/dashboard/page-banner";
import { Package } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function NewProductPage() {
  const t = await getTranslations("products");
  const session = await getServerSession(authOptions);
  if (!session || !canAccessProducts(session.user.role)) {
    redirect("/dashboard");
  }

  async function createProduct(formData: FormData) {
    "use server";
    await prisma.product.create({
      data: {
        name: formData.get("name") as string,
        type: (formData.get("type") as string) || "LICENSE",
        vatRate: parseFloat((formData.get("vatRate") as string) || "0"),
      },
    });
    redirect("/dashboard/products");
  }

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("newProduct")} icon={Package} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <ProductForm action={createProduct} />
      </div>
    </div>
  );
}
