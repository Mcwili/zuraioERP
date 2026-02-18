import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
  },
  logoSection: {
    marginBottom: 24,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  tagline: {
    fontSize: 9,
    color: "#605e5c",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  addressesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  addressBlock: {
    width: "48%",
  },
  metaRow: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e1dfdd",
  },
  metaLine: {
    marginBottom: 2,
  },
  metaLabel: {
    fontWeight: "normal",
  },
  metaValue: {
    fontWeight: "bold",
  },
  table: {
    marginTop: 16,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#1c1c1c",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e1dfdd",
  },
  tableSummaryRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderTopColor: "#1c1c1c",
    justifyContent: "space-between",
  },
  colPosition: { flex: 1, textAlign: "left" },
  colAmount: { width: 100, textAlign: "right" },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 10,
  },
  footerDate: {
    fontWeight: "bold",
  },
});

function formatAmountCHF(val: number): string {
  const formatted = val.toLocaleString("de-CH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return `${formatted.replace(/\s/g, "'")}.-`;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

interface InvoicePdfDocumentProps {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  sender: {
    name: string;
    address: string;
  };
  recipient: {
    name: string;
    address: string;
  };
  projectName: string;
  serviceDescription: string;
  items: InvoiceItem[];
  total: number;
  paymentTerms: string;
  bankDetails: {
    accountHolder: string;
    iban: string;
    bankName: string;
  };
  footerDate: string;
}

export function InvoicePdfDocument({
  invoiceNumber,
  invoiceDate,
  dueDate,
  sender,
  recipient,
  projectName,
  serviceDescription,
  items,
  total,
  paymentTerms,
  bankDetails,
  footerDate,
}: InvoicePdfDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>zuraio</Text>
          <Text style={styles.tagline}>own your data</Text>
        </View>

        <Text style={styles.title}>Rechnung</Text>

        <View style={styles.addressesRow}>
          <View style={styles.addressBlock}>
            <Text style={styles.sectionLabel}>Rechnungsteller</Text>
            <Text style={styles.sectionContent}>{sender.name}</Text>
            <Text style={styles.sectionContent}>{sender.address}</Text>
          </View>
          <View style={styles.addressBlock}>
            <Text style={styles.sectionLabel}>Rechnungsempfänger</Text>
            <Text style={styles.sectionContent}>{recipient.name}</Text>
            <Text style={styles.sectionContent}>{recipient.address}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLine}>
            Rechnungsdatum: <Text style={styles.metaValue}>{invoiceDate}</Text>
          </Text>
          <Text style={styles.metaLine}>
            Rechnungsnummer:{" "}
            <Text style={styles.metaValue}>[{invoiceNumber}]</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Projekt:</Text>
          <Text style={styles.sectionContent}>{projectName || "–"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Leistungsbeschreibung</Text>
          <Text style={styles.sectionContent}>
            {serviceDescription || "–"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Kostenübersicht</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.colPosition, { fontWeight: "bold" }]}>
                Position
              </Text>
              <Text style={[styles.colAmount, { fontWeight: "bold" }]}>
                Betrag Netto (CHF)
              </Text>
            </View>
            {items.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.colPosition}>{item.description}</Text>
                <Text style={styles.colAmount}>
                  {formatAmountCHF(item.amount)}
                </Text>
              </View>
            ))}
            <View style={styles.tableSummaryRow}>
              <Text style={{ fontWeight: "bold" }}>Zwischensumme Netto</Text>
              <Text>{formatAmountCHF(total)}</Text>
            </View>
            <View style={[styles.tableSummaryRow, { borderTopWidth: 0 }]}>
              <Text style={{ fontWeight: "bold" }}>Gesamtbetrag Brutto</Text>
              <Text>{formatAmountCHF(total)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Zahlungsbedingungen</Text>
          <Text style={styles.sectionContent}>
            {paymentTerms || "Zahlbar innert 10 Tagen netto ohne Abzug."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Bankverbindung</Text>
          <Text style={styles.sectionContent}>{bankDetails.accountHolder}</Text>
          <Text style={styles.sectionContent}>{bankDetails.iban}</Text>
          <Text style={styles.sectionContent}>{bankDetails.bankName}</Text>
        </View>

        <View style={styles.footer}>
          <Text>
            Zurich, <Text style={styles.footerDate}>{footerDate}</Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
}
