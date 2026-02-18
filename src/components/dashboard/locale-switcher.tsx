"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, type Locale } from "@/i18n/config";

export function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: Locale) {
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    router.refresh();
  }

  return (
    <div className="relative group">
      <button
        className="p-2 rounded-full hover:bg-zuraio-sidebar text-zuraio-textMuted"
        title="Sprache wechseln"
      >
        <Globe className="h-5 w-5" />
      </button>
      <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100]">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => switchLocale(l)}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-zuraio-sidebar first:rounded-t-md last:rounded-b-md ${
              locale === l ? "bg-zuraio-accent/20 font-medium" : ""
            }`}
          >
            {l === "de" ? "Deutsch" : l === "en" ? "English" : "Português (BR)"}
          </button>
        ))}
      </div>
    </div>
  );
}
