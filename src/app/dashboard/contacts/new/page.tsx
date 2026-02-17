import { createOrganization } from "@/server/actions/organizations";
import { redirect } from "next/navigation";
import { OrganizationForm } from "@/components/contacts/organization-form";
import { PageBanner } from "@/components/dashboard/page-banner";
import { Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function NewOrganizationPage() {
  const t = await getTranslations("contacts");

  async function handleSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const type = formData.get("type") as "CUSTOMER" | "PARTNER" | "SUPPLIER";
    await createOrganization({ name, type });
    redirect("/dashboard/contacts");
  }

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner title={t("organization")} icon={Users} />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <OrganizationForm action={handleSubmit} cancelHref="/dashboard/contacts" />
      </div>
    </div>
  );
}
