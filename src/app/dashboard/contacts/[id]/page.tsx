import { getOrganization } from "@/server/actions/organizations";
import { notFound } from "next/navigation";
import { Mail, Phone, MapPin, Users } from "lucide-react";
import { CreateContactForm } from "@/components/contacts/create-contact-form";
import { EditContactForm } from "@/components/contacts/edit-contact-form";
import { CreateAddressForm } from "@/components/contacts/create-address-form";
import { DocumentUpload } from "@/components/contacts/document-upload";
import { PageBanner } from "@/components/dashboard/page-banner";

export default async function OrganizationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const org = await getOrganization(id);
  if (!org) notFound();

  return (
    <div className="flex flex-col min-h-0">
      <PageBanner
        title={org.name}
        icon={Users}
        backHref="/dashboard/contacts"
      />
      <div className="px-4 sm:px-6 md:px-8 pt-6 pb-8">
      <p className="text-zuraio-textMuted text-sm mb-6">{org.type}</p>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-zuraio-text">Kontakte</h2>
            <CreateContactForm organizationId={org.id} />
          </div>
          <div className="space-y-3">
            {org.contacts.map((c) => (
              <div
                key={c.id}
                className="p-4 border rounded-lg bg-white flex gap-4 items-start"
                style={{ borderColor: "#e1dfdd" }}
              >
                {c.photoUrl ? (
                  <img
                    src={c.photoUrl}
                    alt={`${c.firstName} ${c.lastName}`}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
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
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-zuraio-text">
                    {c.firstName} {c.lastName}
                    {c.isPrimary && (
                      <span className="ml-2 text-xs text-zuraio-accent">
                        (Hauptansprechpartner)
                      </span>
                    )}
                  </p>
                  {c.email && (
                    <p className="text-sm text-zuraio-textMuted flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {c.email}
                    </p>
                  )}
                  {c.phone && (
                    <p className="text-sm text-zuraio-textMuted flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {c.phone}
                    </p>
                  )}
                </div>
                <EditContactForm contact={c} organizationId={org.id} />
              </div>
            ))}
            {org.contacts.length === 0 && (
              <p className="text-zuraio-textMuted text-sm py-4">
                Keine Kontakte. Fügen Sie einen Kontakt hinzu.
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-zuraio-text">Adressen</h2>
            <CreateAddressForm organizationId={org.id} />
          </div>
          <div className="space-y-3">
            {org.addresses.map((a) => (
              <div
                key={a.id}
                className="p-4 border border-gray-200 rounded-lg bg-white"
              >
                <p className="font-medium text-zuraio-text text-sm">
                  {a.type === "INVOICE"
                    ? "Rechnungsadresse"
                    : a.type === "DELIVERY"
                    ? "Lieferadresse"
                    : "Standort"}
                </p>
                <p className="text-sm text-zuraio-textMuted flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {[a.street, a.postalCode, a.city, a.country]
                    .filter(Boolean)
                    .join(", ") || "–"}
                </p>
              </div>
            ))}
            {org.addresses.length === 0 && (
              <p className="text-zuraio-textMuted text-sm py-4">
                Keine Adressen. Fügen Sie eine Adresse hinzu.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-zuraio-text">Dokumente</h2>
          <DocumentUpload organizationId={org.id} />
        </div>
        <div className="space-y-2">
          {org.documents.map((d) => (
            <div
              key={d.id}
              className="p-3 border border-gray-200 rounded-lg bg-white flex justify-between items-center"
            >
              <span className="text-sm text-zuraio-text">{d.fileName}</span>
              <span className="text-xs text-zuraio-textMuted">{d.type}</span>
            </div>
          ))}
          {org.documents.length === 0 && (
            <p className="text-zuraio-textMuted text-sm py-4">
              Keine Dokumente. SharePoint-Upload erfordert Azure AD Konfiguration.
            </p>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
