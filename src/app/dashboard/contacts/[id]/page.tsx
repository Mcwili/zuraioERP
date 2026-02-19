import { getOrganization } from "@/server/actions/organizations";
import { notFound } from "next/navigation";
import Image from "next/image";
import { serializeForRSC } from "@/lib/serialize-order";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessOrders } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import { Mail, Phone, MapPin, Users, FileText, ChevronRight } from "lucide-react";
import { CreateContactForm } from "@/components/contacts/create-contact-form";
import { EditContactForm } from "@/components/contacts/edit-contact-form";
import { CreateAddressForm } from "@/components/contacts/create-address-form";
import { DocumentUpload } from "@/components/contacts/document-upload";
import { OrganizationHeader } from "@/components/contacts/organization-header";
import { PageBanner } from "@/components/dashboard/page-banner";

export default async function OrganizationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("contacts");
  const tOrders = await getTranslations("orders");
  const orgRaw = await getOrganization(id);
  if (!orgRaw) notFound();
  const org = serializeForRSC(orgRaw);

  const session = await getServerSession(authOptions);
  const showOrders = session?.user && canAccessOrders(session.user.role);
  const orders = showOrders
    ? await prisma.order.findMany({
        where: { organizationId: org.id },
        select: { id: true, orderNumber: true, projectName: true, status: true },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const addressTypeLabel = (type: string) =>
    type === "INVOICE" ? t("addressInvoice") : type === "DELIVERY" ? t("addressDelivery") : t("addressHeadquarters");

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner
        title={org.name}
        icon={Users}
        backHref="/dashboard/contacts"
      />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8 min-w-0 overflow-hidden">
      <div className="mb-6">
        <OrganizationHeader organization={org} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 min-w-0">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-zuraio-text">{t("sectionContacts")}</h2>
            <CreateContactForm organizationId={org.id} />
          </div>
          <div className="space-y-3">
            {org.contacts.map((c) => (
              <div
                key={c.id}
                className="p-4 border rounded-lg bg-white flex gap-4 items-start min-w-0 overflow-hidden"
                style={{ borderColor: "#e1dfdd" }}
              >
                {c.photoUrl ? (
                  <Image
                    src={c.photoUrl}
                    alt={`${c.firstName} ${c.lastName}`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                    unoptimized
                  />
                ) : (
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-semibold"
                    style={{ backgroundColor: "#DCE6B5", color: "#1c1c1c" }}
                  >
                    {c.firstName[0]}
                    {c.lastName[0]}
                  </div>
                )}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="font-medium text-zuraio-text truncate">
                    {c.firstName} {c.lastName}
                    {c.isPrimary && (
                      <span className="ml-2 text-xs text-zuraio-accent">
                        {t("primaryContact")}
                      </span>
                    )}
                  </p>
                  {c.email && (
                    <p className="text-sm text-zuraio-textMuted flex items-center gap-1 min-w-0 overflow-hidden">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{c.email}</span>
                    </p>
                  )}
                  {c.phone && (
                    <p className="text-sm text-zuraio-textMuted flex items-center gap-1 min-w-0 overflow-hidden">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{c.phone}</span>
                    </p>
                  )}
                </div>
                <EditContactForm contact={c} organizationId={org.id} />
              </div>
            ))}
            {org.contacts.length === 0 && (
              <p className="text-zuraio-textMuted text-sm py-4">
                {t("noContacts")}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-zuraio-text">{t("sectionAddresses")}</h2>
            <CreateAddressForm organizationId={org.id} />
          </div>
          <div className="space-y-3">
            {org.addresses.map((a) => (
            <div
              key={a.id}
              className="p-4 border border-gray-200 rounded-lg bg-white min-w-0 overflow-hidden"
            >
                <p className="font-medium text-zuraio-text text-sm">
                  {addressTypeLabel(a.type)}
                </p>
                <p className="text-sm text-zuraio-textMuted flex items-center gap-1 mt-1 min-w-0 overflow-hidden">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="break-words">{[a.street, a.postalCode, a.city, a.country]
                    .filter(Boolean)
                    .join(", ") || "–"}</span>
                </p>
              </div>
            ))}
            {org.addresses.length === 0 && (
              <p className="text-zuraio-textMuted text-sm py-4">
                {t("noAddresses")}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-zuraio-text">{t("sectionDocuments")}</h2>
          <DocumentUpload organizationId={org.id} />
        </div>
        <div className="space-y-2">
          {org.documents.map((d) => (
            <div
              key={d.id}
              className="p-3 border border-gray-200 rounded-lg bg-white flex justify-between items-center min-w-0 overflow-hidden"
            >
              <span className="text-sm text-zuraio-text truncate min-w-0">{d.fileName}</span>
              <span className="text-xs text-zuraio-textMuted">{d.type}</span>
            </div>
          ))}
          {org.documents.length === 0 && (
            <p className="text-zuraio-textMuted text-sm py-4">
              {t("noDocuments")}
            </p>
          )}
        </div>
      </div>

      {showOrders && (
        <div className="mt-6">
          <h2 className="font-semibold text-zuraio-text mb-4">{t("sectionOrders")}</h2>
          <div className="space-y-2">
            {orders.map((o) => (
              <Link
                key={o.id}
                href={`/dashboard/orders/${o.id}`}
                className="flex items-center justify-between p-4 border rounded-lg bg-white hover:bg-[#f8f8f7] transition-colors min-w-0 overflow-hidden"
                style={{ borderColor: "#e1dfdd" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-5 w-5 text-zuraio-textMuted flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-zuraio-text truncate">
                      {o.orderNumber || "–"} {o.projectName && `– ${o.projectName}`}
                    </p>
                    <p className="text-xs text-zuraio-textMuted">
                      {tOrders(`status${String(o.status).charAt(0) + String(o.status).slice(1).toLowerCase()}`)}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-zuraio-textMuted flex-shrink-0" />
              </Link>
            ))}
            {orders.length === 0 && (
              <p className="text-zuraio-textMuted text-sm py-4">
                {t("noOrders")}
              </p>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
