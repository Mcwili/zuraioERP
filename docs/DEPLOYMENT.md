# Zuraio ERP – Railway Deployment

## Env-Check vor Deployment

Vor dem ersten Deploy diese Variablen prüfen:

| Variable | Pflicht | Hinweis |
|----------|---------|---------|
| `DATABASE_URL` | Ja | Production-Datenbank-URL |
| `NEXTAUTH_URL` | Ja | **Muss exakt** die Deployment-URL sein (z.B. `https://erp.zuraio.ch`). Kein Trailing-Slash. |
| `NEXTAUTH_SECRET` | Ja | `openssl rand -base64 32` generieren |
| `AUTH_TRUST_HOST` | Bei Proxy | `true` setzen, wenn hinter Reverse-Proxy (z.B. Vercel, Cloudflare) |

**Häufige Fehler:**
- `NEXTAUTH_URL` auf `http://localhost:3000` belassen → Login funktioniert nicht
- `NEXTAUTH_URL` mit Trailing-Slash → Redirect-Probleme
- **Custom Domain:** Wenn Nutzer über `https://erp.zuraio.ch` zugreifen, muss `NEXTAUTH_URL=https://erp.zuraio.ch` sein – nicht die Railway-URL (`zuraioerp-production.up.railway.app`). Sonst wird das Cookie für die falsche Domain gesetzt → doppeltes Einloggen.

## deploy-1: GitHub mit Railway verbinden

1. [Railway](https://railway.app) öffnen und anmelden
2. **New Project** → **Deploy from GitHub repo**
3. Repository `ZuraioERP` auswählen und verbinden
4. **PostgreSQL** Add-on hinzufügen (Add Service → Database → PostgreSQL)
5. Umgebungsvariablen im Projekt setzen (Variables):

| Variable | Beschreibung |
|----------|--------------|
| `DATABASE_URL` | Wird von Railway PostgreSQL automatisch gesetzt (Referenz hinzufügen) |
| `NEXTAUTH_URL` | Exakt die Production-URL (z.B. https://your-app.railway.app), ohne Trailing-Slash |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` ausführen |
| `AUTH_TRUST_HOST` | (Optional) `true` bei Reverse-Proxy |
| `AZURE_CLIENT_ID` | (Optional) Azure AD App für SharePoint |
| `AZURE_CLIENT_SECRET` | (Optional) |
| `AZURE_TENANT_ID` | (Optional) |
| `SHAREPOINT_SITE_ID` | (Optional) |

## deploy-2: Erstes Deploy und Smoke-Tests

1. Push auf `main` löst automatisches Deploy aus
2. Nach erfolgreichem Build: `railway up` oder über Dashboard deployen
3. Smoke-Tests:
   - Login unter `/login` (Admin: admin@zuraio.local nach `npm run db:seed`)
   - Kontakt anlegen unter `/dashboard/contacts`
   - Auftrag erstellen unter `/dashboard/orders`

## Datenbank-Migrationen

Bei Railway werden Migrationen beim Build ausgeführt. Fügen Sie in `package.json` ein Pre-Build-Script hinzu:

```json
"scripts": {
  "build": "prisma generate && prisma migrate deploy && next build"
}
```

Oder führen Sie Migrationen manuell aus: `railway run npx prisma migrate deploy`
