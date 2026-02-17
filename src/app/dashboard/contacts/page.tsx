import { listOrganizations } from "@/server/actions/organizations";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Plus, Users } from "lucide-react";
import { PageBanner } from "@/components/dashboard/page-banner";
import { ContactsTable } from "@/components/contacts/contacts-table";

export default async function ContactsPage() {
  const t = await getTranslations("contacts");
  const organizations = await listOrganizations();

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner
        title={t("title")}
        icon={Users}
        actions={
          <Link
            href="/dashboard/contacts/new"
            className="flex items-center justify-center p-2 rounded-md transition-colors hover:bg-[rgba(0,0,0,0.12)]"
            style={{
              backgroundColor: "rgba(0,0,0,0.08)",
              color: "#000000",
              border: "1px solid rgba(0,0,0,0.12)",
            }}
            title={t("organization")}
          >
            <Plus className="h-5 w-5" />
          </Link>
        }
      />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
        <ContactsTable organizations={organizations} />
      </div>
    </div>
  );
}
