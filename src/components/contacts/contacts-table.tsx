"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ChevronUp, ChevronDown, Search } from "lucide-react";
import { useTranslations } from "next-intl";

type SortKey = "name" | "type" | "contacts";

interface Organization {
  id: string;
  name: string;
  type: string;
  _count: { contacts: number };
}

interface ContactsTableProps {
  organizations: Organization[];
}

export function ContactsTable({ organizations }: ContactsTableProps) {
  const t = useTranslations("contacts");
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
        className="bg-white overflow-hidden border"
        style={{ borderColor: "#e1dfdd" }}
      >
      <table className="w-full text-sm">
        <thead style={{ borderBottom: "1px solid #e1dfdd", backgroundColor: "#f8f8f7" }}>
          <tr>
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
              className="border-t transition-colors hover:bg-[#DCE6B5]"
              style={{ borderColor: "#e1dfdd" }}
            >
              <td className="px-3 py-2">
                <Link
                  href={`/dashboard/contacts/${org.id}`}
                  className="font-medium text-zuraio-text hover:underline"
                >
                  {org.name}
                </Link>
              </td>
              <td className="px-3 py-2 text-zuraio-textMuted text-xs">
                {org.type}
              </td>
              <td className="px-3 py-2 text-zuraio-textMuted text-xs text-right tabular-nums">
                {org._count.contacts}
              </td>
              <td className="px-2 py-2">
                <Link
                  href={`/dashboard/contacts/${org.id}`}
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
