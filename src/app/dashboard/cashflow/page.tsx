import { redirect } from "next/navigation";

export default function CashflowPage() {
  redirect("/dashboard/reporting?report=cashflow");
}
