"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessBilling } from "@/lib/permissions";
import { revalidatePath } from "next/cache";
import { uploadDocument } from "@/lib/sharepoint";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { InvoicePdfDocument } from "@/components/invoice/invoice-pdf-document";

function formatDateLong(d: Date): string {
  const months = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ];
  return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export async function generateInvoicePdf(invoiceId: string) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessBilling(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      order: {
        include: {
          organization: {
            include: {
              addresses: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!invoice) throw new Error("Rechnung nicht gefunden");
  if (!invoice.orderId || !invoice.order) {
    throw new Error("Rechnung muss einem Auftrag zugeordnet sein, um das PDF zu speichern.");
  }

  const total = invoice.items.reduce(
    (sum, i) => sum + Number(i.quantity) * Number(i.unitPrice),
    0
  );

  const items = invoice.items.map((i) => ({
    description: i.description,
    quantity: Number(i.quantity),
    unitPrice: Number(i.unitPrice),
    amount: Number(i.quantity) * Number(i.unitPrice),
  }));

  const org = invoice.order.organization;
  const invoiceAddress =
    org.addresses.find((a) => a.type === "INVOICE") || org.addresses[0];
  const recipientAddress = invoiceAddress
    ? [
        invoiceAddress.street,
        [invoiceAddress.postalCode, invoiceAddress.city]
          .filter(Boolean)
          .join(" "),
        invoiceAddress.country || "CH",
      ]
        .filter(Boolean)
        .join("\n")
    : org.name;

  const senderName = process.env.INVOICE_SENDER_NAME || "Polley Consulting";
  const senderAddress =
    process.env.INVOICE_SENDER_ADDRESS || "Ziegestrasse 15, 8038 Zürich CH";
  const bankHolder =
    process.env.INVOICE_BANK_ACCOUNT_HOLDER || "Samuel Alexander Polley";
  const bankIban =
    process.env.INVOICE_BANK_IBAN || "CH07 0900 00003161 3310 8";
  const bankName = process.env.INVOICE_BANK_NAME || "Post Finance";

  const serviceDescription =
    items.length > 0
      ? items.map((i) => i.description).join("; ")
      : "Beschreibung der Leistung";

  const pdfElement = React.createElement(InvoicePdfDocument, {
    invoiceNumber: invoice.number,
    invoiceDate: formatDateLong(invoice.createdAt),
    dueDate: invoice.dueDate.toLocaleDateString("de-CH"),
    sender: { name: senderName, address: senderAddress },
    recipient: {
      name: org.name,
      address: recipientAddress,
    },
    projectName: invoice.order.projectName || invoice.order.orderNumber || "–",
    serviceDescription,
    items,
    total,
    paymentTerms:
      invoice.order.paymentTerms || "Zahlbar innert 10 Tagen netto ohne Abzug.",
    bankDetails: {
      accountHolder: bankHolder,
      iban: bankIban,
      bankName,
    },
    footerDate: formatDateLong(new Date()),
  });

  const buffer = (await renderToBuffer(pdfElement)) as Buffer;
  const fileName = `Rechnung_${invoice.number.replace(/[/\\?%*:|"<>]/g, "_")}.pdf`;

  try {
    const result = await uploadDocument(
      invoice.order.organizationId,
      invoice.orderId,
      "CORRESPONDENCE",
      fileName,
      buffer,
      "application/pdf"
    );

    await prisma.document.create({
      data: {
        organizationId: invoice.order.organizationId,
        orderId: invoice.orderId,
        type: "CORRESPONDENCE",
        fileName,
        sharePointDriveId: result.driveId,
        sharePointItemId: result.itemId,
        sharePointWebUrl: result.webUrl ?? null,
        mimeType: "application/pdf",
        size: buffer.length,
        uploadedById: session.user.id,
      },
    });

    revalidatePath(`/dashboard/billing/${invoiceId}`);
    revalidatePath(`/dashboard/billing`);
    revalidatePath(`/dashboard/orders/${invoice.orderId}`);
  } catch (err) {
    console.error("Invoice PDF upload error:", err);
    throw new Error(
      "PDF konnte nicht gespeichert werden. Prüfen Sie die SharePoint-Konfiguration."
    );
  }
}
