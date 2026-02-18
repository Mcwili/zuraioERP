-- AlterEnum
ALTER TYPE "DocumentType" ADD VALUE 'TASK_ATTACHMENT';

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "order_task_id" TEXT;

-- CreateIndex
CREATE INDEX "documents_order_task_id_idx" ON "documents"("order_task_id");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_order_task_id_fkey" FOREIGN KEY ("order_task_id") REFERENCES "order_tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
