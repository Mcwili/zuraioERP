-- CreateEnum
CREATE TYPE "PlannedExpenseStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'PAID');

-- CreateEnum
CREATE TYPE "ExpenseCostType" AS ENUM ('LOHN', 'SPESEN', 'AUS_WEITERBILDUNG', 'SONSTIGES', 'BUCHFUEHRUNG', 'FAHRZEUG', 'INFORMATIK', 'UNTERHALT_REPARATUR_ERSATZ', 'VERWALTUNG', 'WERBUNG_AKQUISITION', 'PERSONNEL', 'EXTERNAL', 'INFRASTRUCTURE');

-- CreateTable
CREATE TABLE "planned_expenses" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT,
    "order_id" TEXT,
    "description" TEXT NOT NULL,
    "estimated_amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'CHF',
    "planned_date" TIMESTAMP(3),
    "cost_type" "ExpenseCostType" NOT NULL,
    "status" "PlannedExpenseStatus" NOT NULL DEFAULT 'PLANNED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planned_expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense_actual_costs" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT,
    "order_id" TEXT,
    "planned_expense_id" TEXT,
    "description" TEXT,
    "amount" DECIMAL(12,2) NOT NULL,
    "vat_amount" DECIMAL(12,2) DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'CHF',
    "paid_at" TIMESTAMP(3) NOT NULL,
    "supplier" TEXT,
    "assigned_month" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "expense_actual_costs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "planned_expenses_organization_id_idx" ON "planned_expenses"("organization_id");
CREATE INDEX "planned_expenses_order_id_idx" ON "planned_expenses"("order_id");
CREATE INDEX "planned_expenses_status_idx" ON "planned_expenses"("status");
CREATE INDEX "planned_expenses_planned_date_idx" ON "planned_expenses"("planned_date");

-- CreateIndex
CREATE INDEX "expense_actual_costs_organization_id_idx" ON "expense_actual_costs"("organization_id");
CREATE INDEX "expense_actual_costs_order_id_idx" ON "expense_actual_costs"("order_id");
CREATE INDEX "expense_actual_costs_planned_expense_id_idx" ON "expense_actual_costs"("planned_expense_id");
CREATE INDEX "expense_actual_costs_paid_at_idx" ON "expense_actual_costs"("paid_at");
CREATE INDEX "expense_actual_costs_assigned_month_idx" ON "expense_actual_costs"("assigned_month");

-- AddForeignKey
ALTER TABLE "planned_expenses" ADD CONSTRAINT "planned_expenses_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "planned_expenses" ADD CONSTRAINT "planned_expenses_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense_actual_costs" ADD CONSTRAINT "expense_actual_costs_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "expense_actual_costs" ADD CONSTRAINT "expense_actual_costs_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "expense_actual_costs" ADD CONSTRAINT "expense_actual_costs_planned_expense_id_fkey" FOREIGN KEY ("planned_expense_id") REFERENCES "planned_expenses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "documents" ADD COLUMN "expense_actual_cost_id" TEXT;

-- CreateIndex
CREATE INDEX "documents_expense_actual_cost_id_idx" ON "documents"("expense_actual_cost_id");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_expense_actual_cost_id_fkey" FOREIGN KEY ("expense_actual_cost_id") REFERENCES "expense_actual_costs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
