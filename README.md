# Zuraio ERP

ERP-System für Kontaktverwaltung, Aufträge und Rechnungen.

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Auth.js (NextAuth)
- next-intl (i18n: de, en, pt-BR)
- Microsoft Graph API (SharePoint)

## Setup

### Voraussetzungen

- Node.js 20+
- PostgreSQL
- (Optional) Azure AD App für SharePoint

### Installation

```bash
npm install
cp .env.example .env
# DATABASE_URL und NEXTAUTH_SECRET in .env setzen
npx prisma migrate deploy
npx prisma generate
```

### Entwicklung

```bash
npm run dev
```

### Erster Admin-Benutzer

Nach dem ersten DB-Setup einen Admin anlegen:

```bash
npx prisma db seed
# oder manuell via Prisma Studio: npm run db:studio
```

## Railway Deployment

1. GitHub-Repo mit Railway verbinden
2. PostgreSQL Add-on hinzufügen
3. Umgebungsvariablen setzen:
   - `DATABASE_URL` (von Railway PostgreSQL)
   - `NEXTAUTH_URL` (z.B. https://your-app.railway.app)
   - `NEXTAUTH_SECRET` (openssl rand -base64 32)
   - `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, `AZURE_TENANT_ID` (für SharePoint)
   - `SHAREPOINT_SITE_ID` oder `SHAREPOINT_DRIVE_ID`
4. Deploy auslösen (Push auf main)

## Projektstruktur

```
src/
├── app/           # Next.js App Router
├── components/    # React-Komponenten
├── lib/           # Prisma, Auth, SharePoint, Audit
├── server/        # Server Actions
├── i18n/          # next-intl Konfiguration
└── locales/       # Sprachdateien (de, en, pt-BR)
```
