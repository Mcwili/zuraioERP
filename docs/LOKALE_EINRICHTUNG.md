# Lokale Entwicklungsumgebung – Zuraio ERP

## Übersicht

Für die lokale Entwicklung wird **PostgreSQL** benötigt. Es gibt mehrere Optionen:

---

## Option 1: Docker (empfohlen)

**Voraussetzung:** Docker Desktop installiert und gestartet.

```powershell
# PostgreSQL starten
docker compose up -d

# Prüfen ob Container läuft
docker ps
```

**Datenbank-URL** (bereits in `.env`): `postgresql://postgres:postgres@localhost:5432/zuraio_erp`

---

## Option 2: PostgreSQL (winget)

PostgreSQL 17 wurde per winget installiert.

**Wichtig:** Beim Installer wurde ein Passwort für den Benutzer `postgres` abgefragt. Verwende dieses Passwort in der `DATABASE_URL`.

1. **Datenbank anlegen** (falls noch nicht vorhanden):
   - pgAdmin öffnen (über Startmenü) oder
   - `psql -U postgres` und dann: `CREATE DATABASE zuraio_erp;`

2. **`.env` anpassen:**
   ```
   DATABASE_URL="postgresql://postgres:DEIN_PASSWORT@localhost:5432/zuraio_erp"
   ```

3. **PostgreSQL-Dienst prüfen:**
   ```powershell
   Get-Service -Name "postgresql*"
   # Falls gestoppt:
   Start-Service postgresql-x64-17
   ```

---

## Nach der Datenbank-Einrichtung

```powershell
# Schema anwenden
npx prisma db push

# Testdaten (Admin-User) anlegen
npx prisma db seed
```

**Logindaten:**
- E-Mail: `admin@zuraio.local`
- Passwort: `Admin123!@#`

---

## App starten

```powershell
npm run dev
```

Öffne http://localhost:3000 (oder 3001 falls 3000 belegt ist).
