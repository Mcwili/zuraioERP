import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageBannerProps {
  title: string;
  icon: LucideIcon;
  backHref?: string;
  actions?: React.ReactNode;
}

export function PageBanner({ title, icon: Icon, backHref, actions }: PageBannerProps) {
  return (
    <div
      className="h-14 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-8 shrink-0 -mt-4 -ml-4 -mr-4 md:-mt-6 md:-ml-6 md:-mr-6 min-w-0 overflow-hidden"
      style={{
        backgroundColor: "#9FAF52",
        borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
        {backHref && (
          <Link
            href={backHref}
            className="flex items-center justify-center p-2 rounded-md transition-colors hover:bg-[rgba(0,0,0,0.12)] flex-shrink-0"
            title="Zurück zur Liste"
          >
            <ArrowLeft className="h-5 w-5" style={{ color: "#000000" }} />
          </Link>
        )}
        {Icon ? <Icon className="h-5 w-5 flex-shrink-0" style={{ color: "#000000" }} /> : null}
        <h1 className="font-medium text-base truncate min-w-0" style={{ color: "#000000" }}>
          {title}
        </h1>
      </div>
      <div className="flex-shrink-0">{actions}</div>
    </div>
  );
}
