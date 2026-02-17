# Zuraio ERP – Railway Deployment

## deploy-1: GitHub mit Railway verbinden

1. [Railway](https://railway.app) öffnen und anmelden
2. **New Project** → **Deploy from GitHub repo**
3. Repository `ZuraioERP` auswählen und verbinden
4. **PostgreSQL** Add-on hinzufügen (Add Service → Database → PostgreSQL)
5. Umgebungsvariablen im Projekt setzen (Variables):

| Variable | Beschreibung |
|----------|--------------|
| `DATABASE_URL` | Wird von Railway PostgreSQL automatisch gesetzt (Referenz hinzufügen) |
| `NEXTAUTH_URL` | https://your-app.railway.app (nach erstem Deploy die echte URL) |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` ausführen |
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
