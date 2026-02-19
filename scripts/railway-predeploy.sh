#!/bin/sh
set -e
# Fehlgeschlagene Migration zurücksetzen (ignoriert Fehler falls nicht nötig)
npx prisma migrate resolve --rolled-back 20260219210000_add_document_expense_actual_cost 2>/dev/null || true
npx prisma migrate deploy
npm run db:seed
