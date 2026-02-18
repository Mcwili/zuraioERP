"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronUp, ChevronDown, Search, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

type SortKey = "name" | "type" | "contacts";

interface Address {
  id: string;
  type: string;
  street: string | null;
  postalCode: string | null;
  city: string | null;
  country: string | null;
}

interface Organization {
  id: string;
  name: string;
  type: string;
  logoUrl: string | null;
  addresses: Address[];
  _count: { contacts: number };
}

function getMainAddress(addresses: Address[]): string {
  const order = ["HEADQUARTERS", "INVOICE", "DELIVERY"];
  for (const type of order) {
    const addr = addresses.find((a) => a.type === type);
    if (addr) {
      const parts = [addr.street, [addr.postalCode, addr.city].filter(Boolean).join(" "), addr.country].filter(Boolean);
      return parts.join(", ") || "–";
    }
  }
  const first = addresses[0];
  if (first) {
    const parts = [first.street, [first.postalCode, first.city].filter(Boolean).join(" "), first.country].filter(Boolean);
    return parts.join(", ") || "–";
  }
  return "–";
}

interface ContactsTableProps {
  organizations: Organization[];
}

export function ContactsTable({ organizations }: ContactsTableProps) {
  const t = useTranslations("contacts");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filtered = organizations.filter((org) =>
    org.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "name") {
      cmp = a.name.localeCompare(b.name);
    } else if (sortBy === "type") {
      cmp = a.type.localeCompare(b.type);
    } else {
      cmp = a._count.contacts - b._count.contacts;
    }
    return sortOrder === "asc" ? cmp : -cmp;
  });

  const SortIcon = ({ column }: { column: SortKey }) => (
    <span className="inline-flex w-4 h-4 ml-0.5 shrink-0 items-center justify-center">
      {sortBy === column ? (
        sortOrder === "asc" ? (
          <ChevronUp className="h-3.5 w-3.5" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5" />
        )
      ) : null}
    </span>
  );

  return (
    <div className="space-y-3">
      <div
        className="relative flex items-center"
        style={{ borderColor: "#e1dfdd" }}
      >
        <Search
          className="absolute left-3 h-4 w-4 pointer-events-none"
          style={{ color: "#605e5c" }}
        />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full pl-9 pr-3 py-2 text-sm border rounded border-[#e1dfdd] bg-white placeholder:text-zuraio-textMuted focus:outline-none focus:ring-2 focus:ring-[#DCE6B5]"
        />
      </div>
      <div
        className="bg-white overflow-x-auto overflow-y-hidden border"
        style={{ borderColor: "#e1dfdd" }}
      >
      <table className="w-full text-sm">
        <thead style={{ borderBottom: "1px solid #e1dfdd", backgroundColor: "#f8f8f7" }}>
          <tr>
            <th className="text-left px-3 py-2 w-12" />
            <th className="text-left px-3 py-2">
              <button
                type="button"
                onClick={() => handleSort("name")}
                className="text-xs font-medium text-zuraio-textMuted uppercase tracking-wider hover:text-zuraio-text transition-colors flex items-center cursor-pointer"
              >
                {t("columnName")}
                <SortIcon column="name" />
              </button>
            </th>
            <th className="text-left px-3 py-2 w-24">
              <button
                type="button"
                onClick={() => handleSort("type")}
                className="text-xs font-medium text-zuraio-textMuted uppercase tracking-wider hover:text-zuraio-text transition-colors flex items-center cursor-pointer"
              >
                {t("columnType")}
                <SortIcon column="type" />
              </button>
            </th>
            <th className="text-left px-3 py-2 w-40">
              <span className="text-xs font-medium text-zuraio-textMuted uppercase tracking-wider">
                {t("columnAddress")}
              </span>
            </th>
            <th className="px-3 py-2 w-20">
              <button
                type="button"
                onClick={() => handleSort("contacts")}
                className="text-xs font-medium text-zuraio-textMuted uppercase tracking-wider hover:text-zuraio-text transition-colors flex items-center justify-end w-full cursor-pointer"
              >
                {t("columnContacts")}
                <SortIcon column="contacts" />
              </button>
            </th>
            <th className="w-10 px-2 py-2" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((org) => (
            <tr
              key={org.id}
              onClick={() => router.push(`/dashboard/contacts/${org.id}`)}
              className="border-t transition-colors hover:bg-[#DCE6B5] cursor-pointer"
              style={{ borderColor: "#e1dfdd" }}
            >
              <td className="px-3 py-2 w-12">
                {org.logoUrl ? (
                  <div className="w-10 h-10 rounded flex items-center justify-center overflow-hidden flex-shrink-0 bg-[#f8f8f7]">
                    <img
                      src={org.logoUrl}
                      alt={org.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 text-sm font-semibold"
                    style={{ backgroundColor: "#DCE6B5", color: "#1c1c1c" }}
                  >
                    <Building2 className="h-5 w-5" />
                  </div>
                )}
              </td>
              <td className="px-3 py-2 max-w-0">
                <span className="font-medium text-zuraio-text block truncate">
                  {org.name}
                </span>
              </td>
              <td className="px-3 py-2 text-zuraio-textMuted text-xs max-w-0">
                <span className="block truncate">{org.type}</span>
              </td>
              <td className="px-3 py-2 text-zuraio-textMuted text-xs max-w-0">
                <span className="block truncate" title={getMainAddress(org.addresses)}>
                  {getMainAddress(org.addresses)}
                </span>
              </td>
              <td className="px-3 py-2 text-zuraio-textMuted text-xs text-right tabular-nums">
                {org._count.contacts}
              </td>
              <td className="px-2 py-2">
                <Link
                  href={`/dashboard/contacts/${org.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center justify-center w-7 h-7 rounded transition-colors hover:bg-[#DCE6B5]"
                  style={{ color: "#9FAF52" }}
                  title={t("open")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {organizations.length === 0 && (
        <div className="px-4 py-8 text-center text-zuraio-textMuted text-sm">
          {t("noOrganizations")}
        </div>
      )}
      {organizations.length > 0 && filtered.length === 0 && (
        <div className="px-4 py-8 text-center text-zuraio-textMuted text-sm">
          {t("noContactsFound")}
        </div>
      )}
      </div>
    </div>
  );
}
