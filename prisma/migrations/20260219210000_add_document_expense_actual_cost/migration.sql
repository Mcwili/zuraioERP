-- AlterTable
ALTER TABLE "documents" ADD COLUMN "expense_actual_cost_id" TEXT;

-- CreateIndex
CREATE INDEX "documents_expense_actual_cost_id_idx" ON "documents"("expense_actual_cost_id");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_expense_actual_cost_id_fkey" FOREIGN KEY ("expense_actual_cost_id") REFERENCES "expense_actual_costs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
