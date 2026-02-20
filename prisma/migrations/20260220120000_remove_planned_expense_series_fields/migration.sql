-- AlterTable
ALTER TABLE "planned_expenses" DROP COLUMN IF EXISTS "series_start_month",
DROP COLUMN IF EXISTS "series_end_month",
DROP COLUMN IF EXISTS "billing_day",
DROP COLUMN IF EXISTS "billing_interval_months";
