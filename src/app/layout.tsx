import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Zuraio ERP",
  description: "Zuraio ERP - Kontaktverwaltung, Aufträge und Rechnungen",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="de">
      <body className="antialiased">
        <NextIntlClientProvider messages={messages ?? {}}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
