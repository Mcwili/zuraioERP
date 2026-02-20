-- AlterTable
ALTER TABLE "planned_expenses" ADD COLUMN "series_start_month" TEXT,
ADD COLUMN "series_end_month" TEXT,
ADD COLUMN "billing_day" INTEGER;
