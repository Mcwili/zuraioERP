-- AlterTable
ALTER TABLE "billing_plan_items" ADD COLUMN "address_id" TEXT;
ALTER TABLE "billing_plan_items" ADD COLUMN "contact_id" TEXT;

-- AddForeignKey
ALTER TABLE "billing_plan_items" ADD CONSTRAINT "billing_plan_items_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "billing_plan_items" ADD CONSTRAINT "billing_plan_items_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
