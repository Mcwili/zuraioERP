"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { canAccessReporting } from "@/lib/permissions";

export type ReportType =
  | "income-statement"
  | "balance-sheet"
  | "cashflow"
  | "revenue"
  | "open-items"
  | "budget-vs-actual";

export interface ReportingFilters {
  year?: number;
  month?: number;
  dateFrom?: Date;
  dateTo?: Date;
  organizationId?: string | null;
  orderId?: string | null;
}

function getDefaultDateRange(month?: number, year?: number): { from: Date; to: Date } {
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = month ?? now.getMonth() + 1;
  const from = new Date(y, m - 1, 1);
  const to = new Date(y, m, 0);
  return { from, to };
}

function getYearRange(year: number): { from: Date; to: Date } {
  return {
    from: new Date(year, 0, 1),
    to: new Date(year, 11, 31),
  };
}

/** Kostenarten für Personalaufwand (Unterpositionen) */
const PERSONNEL_COST_TYPES = ["LOHN", "SPESEN", "AUS_WEITERBILDUNG", "PERSONNEL"] as const;

/** Kostenarten für Betriebsaufwand (Unterpositionen) */
const OPERATING_COST_TYPES = [
  "SONSTIGES",
  "BUCHFUEHRUNG",
  "FAHRZEUG",
  "INFORMATIK",
  "UNTERHALT_REPARATUR_ERSATZ",
  "VERWALTUNG",
  "WERBUNG_AKQUISITION",
  "EXTERNAL",
  "INFRASTRUCTURE",
] as const;

/** Projektbezogene Kostenarten → Direkter Aufwand */
const DIRECT_COST_TYPES = ["EXTERNAL", "INFRASTRUCTURE"] as const;

function getExpenseCategory(
  costType: string | null,
  orderId: string | null
): "direct" | "personnel" | "operating" {
  if (!costType) return "operating";
  if (orderId && DIRECT_COST_TYPES.includes(costType as (typeof DIRECT_COST_TYPES)[number])) {
    return "direct";
  }
  if (PERSONNEL_COST_TYPES.includes(costType as (typeof PERSONNEL_COST_TYPES)[number])) {
    return "personnel";
  }
  return "operating";
}

export interface IncomeStatementMonthData {
  month: string;
  label: string;
  isActual: boolean;
  /** Ist-Werte (A-Spalten) */
  revenue: number;
  directCost: number;
  directCostByType: Record<string, number>;
  personnelCost: number;
  personnelCostByType: Record<string, number>;
  propertyCost: number;
  operatingCost: number;
  operatingCostByType: Record<string, number>;
  grossProfit: number;
  ebitda: number;
  normalizations: number;
  normalizedEbitda: number;
  /** Budget-Werte (B-Spalten) */
  budgetRevenue: number;
  budgetDirectCost: number;
  budgetPersonnelCost: number;
  budgetPropertyCost: number;
  budgetOperatingCost: number;
  budgetGrossProfit: number;
  budgetEbitda: number;
  budgetNormalizations: number;
  budgetNormalizedEbitda: number;
}

export interface IncomeStatementData {
  year: number;
  months: IncomeStatementMonthData[];
  currency: string;
  /** Legacy: für Rückwärtskompatibilität */
  revenueInvoiced?: number;
  revenuePaid?: number;
  expenses?: number;
  profit?: number;
}

export async function getIncomeStatementData(filters?: ReportingFilters) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessReporting(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const year = filters?.year ?? new Date().getFullYear();
  const { from, to } = filters?.dateFrom && filters?.dateTo
    ? { from: filters.dateFrom, to: filters.dateTo }
    : getYearRange(year);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [payments, expenses, ordersWithBudget, plannedBillingItems] = await Promise.all([
    prisma.payment.findMany({
      where: {
        paidAt: { gte: from, lte: to },
        ...(filters?.orderId && { invoice: { orderId: filters.orderId } }),
      },
      select: { amount: true, paidAt: true },
    }),
    prisma.expenseActualCost.findMany({
      where: {
        paidAt: { gte: from, lte: to },
        ...(filters?.organizationId && { organizationId: filters.organizationId }),
        ...(filters?.orderId && { orderId: filters.orderId }),
      },
      select: {
        amount: true,
        paidAt: true,
        orderId: true,
        plannedExpense: { select: { costType: true } },
      },
    }),
    prisma.order.findMany({
      where: {
        ...(filters?.organizationId && { organizationId: filters.organizationId }),
        ...(filters?.orderId && { id: filters.orderId }),
      },
      select: {
        budgetPlans: {
          orderBy: { version: "desc" },
          take: 1,
          select: { months: { where: { yearMonth: { gte: `${year}-01`, lte: `${year}-12` } } } },
        },
      },
    }),
    prisma.billingPlanItem.findMany({
      where: {
        dueDate: { gte: from, lte: to },
        status: { in: ["PLANNED", "INVOICED"] },
        billingPlan: {
          order: {
            ...(filters?.organizationId && { organizationId: filters.organizationId }),
            ...(filters?.orderId && { id: filters.orderId }),
          },
        },
      },
      select: { amount: true, dueDate: true },
    }),
  ]);

  const monthMap = new Map<string, IncomeStatementMonthData>();
  const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  for (let m = 1; m <= 12; m++) {
    const key = `${year}-${String(m).padStart(2, "0")}`;
    const isActual = year < currentYear || (year === currentYear && m < currentMonth);
    monthMap.set(key, {
      month: key,
      label: `${months[m - 1]} ${year}`,
      isActual,
      revenue: 0,
      directCost: 0,
      directCostByType: {},
      personnelCost: 0,
      personnelCostByType: {},
      propertyCost: 0,
      operatingCost: 0,
      operatingCostByType: {},
      grossProfit: 0,
      ebitda: 0,
      normalizations: 0,
      normalizedEbitda: 0,
      budgetRevenue: 0,
      budgetDirectCost: 0,
      budgetPersonnelCost: 0,
      budgetPropertyCost: 0,
      budgetOperatingCost: 0,
      budgetGrossProfit: 0,
      budgetEbitda: 0,
      budgetNormalizations: 0,
      budgetNormalizedEbitda: 0,
    });
  }

  for (const p of payments) {
    const key = `${new Date(p.paidAt).getFullYear()}-${String(new Date(p.paidAt).getMonth() + 1).padStart(2, "0")}`;
    const entry = monthMap.get(key);
    if (entry) entry.revenue += Number(p.amount);
  }

  for (const e of expenses) {
    const costType = e.plannedExpense?.costType ?? "SONSTIGES";
    const cat = getExpenseCategory(costType, e.orderId);
    const key = `${new Date(e.paidAt).getFullYear()}-${String(new Date(e.paidAt).getMonth() + 1).padStart(2, "0")}`;
    const entry = monthMap.get(key);
    if (!entry) continue;

    const amt = Number(e.amount);
    if (cat === "direct") {
      entry.directCost += amt;
      entry.directCostByType[costType] = (entry.directCostByType[costType] ?? 0) + amt;
    } else if (cat === "personnel") {
      entry.personnelCost += amt;
      entry.personnelCostByType[costType] = (entry.personnelCostByType[costType] ?? 0) + amt;
    } else {
      entry.operatingCost += amt;
      entry.operatingCostByType[costType] = (entry.operatingCostByType[costType] ?? 0) + amt;
    }
  }

  for (const order of ordersWithBudget) {
    const plan = order.budgetPlans[0];
    if (!plan?.months) continue;
    for (const bm of plan.months) {
      const entry = monthMap.get(bm.yearMonth);
      if (!entry) continue;
      entry.budgetRevenue += Number(bm.plannedRevenue ?? 0);
      entry.budgetDirectCost += Number(bm.plannedExternal ?? 0);
      entry.budgetPersonnelCost += Number(bm.plannedPersonnel ?? 0);
      entry.budgetOperatingCost += Number(bm.plannedInfrastructure ?? 0);
    }
  }

  for (const item of plannedBillingItems) {
    const key = `${new Date(item.dueDate).getFullYear()}-${String(new Date(item.dueDate).getMonth() + 1).padStart(2, "0")}`;
    const entry = monthMap.get(key);
    if (entry) entry.budgetRevenue += Number(item.amount);
  }

  Array.from(monthMap.values()).forEach((entry) => {
    entry.grossProfit = entry.revenue - entry.directCost;
    entry.ebitda =
      entry.grossProfit -
      entry.personnelCost -
      entry.propertyCost -
      entry.operatingCost;
    entry.normalizedEbitda = entry.ebitda + entry.normalizations;

    entry.budgetGrossProfit = entry.budgetRevenue - entry.budgetDirectCost;
    entry.budgetEbitda =
      entry.budgetGrossProfit -
      entry.budgetPersonnelCost -
      entry.budgetPropertyCost -
      entry.budgetOperatingCost;
    entry.budgetNormalizedEbitda = entry.budgetEbitda + entry.budgetNormalizations;
  });

  const monthsArray = Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => {
      const round = (n: number) => Math.round(n * 100) / 100;
      return {
        ...v,
        revenue: round(v.revenue),
        directCost: round(v.directCost),
        personnelCost: round(v.personnelCost),
        propertyCost: round(v.propertyCost),
        operatingCost: round(v.operatingCost),
        grossProfit: round(v.grossProfit),
        ebitda: round(v.ebitda),
        normalizations: round(v.normalizations),
        normalizedEbitda: round(v.normalizedEbitda),
        budgetRevenue: round(v.budgetRevenue),
        budgetDirectCost: round(v.budgetDirectCost),
        budgetPersonnelCost: round(v.budgetPersonnelCost),
        budgetPropertyCost: round(v.budgetPropertyCost),
        budgetOperatingCost: round(v.budgetOperatingCost),
        budgetGrossProfit: round(v.budgetGrossProfit),
        budgetEbitda: round(v.budgetEbitda),
        budgetNormalizations: round(v.budgetNormalizations),
        budgetNormalizedEbitda: round(v.budgetNormalizedEbitda),
      };
    });

  return {
    year,
    months: monthsArray,
    currency: "CHF",
  };
}

export async function getBalanceSheetData(filters?: ReportingFilters) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessReporting(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const asOf = filters?.dateTo ?? new Date();

  const invoices = await prisma.invoice.findMany({
    where: {
      createdAt: { lte: asOf },
      ...(filters?.orderId && { orderId: filters.orderId }),
      ...(filters?.organizationId && { order: { organizationId: filters.organizationId } }),
    },
    include: {
      items: true,
      payments: true,
    },
  });

  let totalInvoiced = 0;
  let totalPaid = 0;
  for (const inv of invoices) {
    const invTotal = inv.items.reduce(
      (s, i) => s + Number(i.quantity) * Number(i.unitPrice),
      0
    );
    totalInvoiced += invTotal;
    totalPaid += inv.payments.reduce((s, p) => s + Number(p.amount), 0);
  }

  const receivables = totalInvoiced - totalPaid;

  return {
    receivables: Math.max(0, receivables),
    note: "Bank, Verbindlichkeiten und Eigenkapital sind nicht im ERP erfasst. Für vollständige Bilanz: Buchhaltungsintegration erforderlich.",
    currency: "CHF",
  };
}

export interface CashflowMonthData {
  month: string;
  label: string;
  isActual: boolean;
  inflows: number;
  outflows: number;
  net: number;
  plannedInflows: number;
  plannedOutflows: number;
  plannedNet: number;
}

export async function getCashflowData(filters?: ReportingFilters) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessReporting(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const { from, to } = filters?.dateFrom && filters?.dateTo
    ? { from: filters.dateFrom, to: filters.dateTo }
    : (filters?.year ? getYearRange(filters.year) : getDefaultDateRange(filters?.month, filters?.year));

  const [payments, expenses, plannedBillingItems, plannedExpenses] = await Promise.all([
    prisma.payment.findMany({
      where: {
        paidAt: { gte: from, lte: to },
        ...(filters?.orderId && { invoice: { orderId: filters.orderId } }),
      },
      select: { amount: true, paidAt: true },
    }),
    prisma.expenseActualCost.findMany({
      where: {
        paidAt: { gte: from, lte: to },
        ...(filters?.organizationId && { organizationId: filters.organizationId }),
        ...(filters?.orderId && { orderId: filters.orderId }),
      },
      select: { amount: true, paidAt: true },
    }),
    prisma.billingPlanItem.findMany({
      where: {
        dueDate: { gte: from, lte: to },
        status: { in: ["PLANNED", "INVOICED"] },
        ...(filters?.orderId && { billingPlan: { orderId: filters.orderId } }),
      },
      select: { amount: true, dueDate: true },
    }),
    prisma.plannedExpense.findMany({
      where: {
        plannedDate: { gte: from, lte: to },
        ...(filters?.organizationId && { organizationId: filters.organizationId }),
        ...(filters?.orderId && { orderId: filters.orderId }),
      },
      select: { estimatedAmount: true, plannedDate: true },
    }),
  ]);

  const monthMap = new Map<
    string,
    { inflows: number; outflows: number; plannedInflows: number; plannedOutflows: number }
  >();
  let d = new Date(from.getFullYear(), from.getMonth(), 1);
  const endMonth = new Date(to.getFullYear(), to.getMonth(), 1);
  const now = new Date();
  while (d <= endMonth) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthMap.set(key, { inflows: 0, outflows: 0, plannedInflows: 0, plannedOutflows: 0 });
    d.setMonth(d.getMonth() + 1);
  }

  for (const p of payments) {
    const pd = new Date(p.paidAt);
    const key = `${pd.getFullYear()}-${String(pd.getMonth() + 1).padStart(2, "0")}`;
    const entry = monthMap.get(key);
    if (entry) entry.inflows += Number(p.amount);
  }
  for (const e of expenses) {
    const ed = new Date(e.paidAt);
    const key = `${ed.getFullYear()}-${String(ed.getMonth() + 1).padStart(2, "0")}`;
    const entry = monthMap.get(key);
    if (entry) entry.outflows += Number(e.amount);
  }
  for (const b of plannedBillingItems) {
    const bd = new Date(b.dueDate);
    const key = `${bd.getFullYear()}-${String(bd.getMonth() + 1).padStart(2, "0")}`;
    const entry = monthMap.get(key);
    if (entry) entry.plannedInflows += Number(b.amount);
  }
  for (const pe of plannedExpenses) {
    if (!pe.plannedDate) continue;
    const ped = new Date(pe.plannedDate);
    const key = `${ped.getFullYear()}-${String(ped.getMonth() + 1).padStart(2, "0")}`;
    const entry = monthMap.get(key);
    if (entry) entry.plannedOutflows += Number(pe.estimatedAmount);
  }

  const monthLabels = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  return Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, v]) => {
      const [y, m] = key.split("-");
      const year = parseInt(y || "0", 10);
      const month = parseInt(m || "1", 10);
      const isActual =
        year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1);
      return {
        month: key,
        label: `${monthLabels[month - 1]} ${y}`,
        isActual,
        inflows: Math.round(v.inflows * 100) / 100,
        outflows: Math.round(v.outflows * 100) / 100,
        net: Math.round((v.inflows - v.outflows) * 100) / 100,
        plannedInflows: Math.round(v.plannedInflows * 100) / 100,
        plannedOutflows: Math.round(v.plannedOutflows * 100) / 100,
        plannedNet: Math.round((v.plannedInflows - v.plannedOutflows) * 100) / 100,
      };
    });
}

export async function getRevenueOverviewData(filters?: ReportingFilters) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessReporting(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const { from, to } = filters?.dateFrom && filters?.dateTo
    ? { from: filters.dateFrom, to: filters.dateTo }
    : (filters?.year ? getYearRange(filters.year) : getDefaultDateRange(filters?.month, filters?.year));

  const invoices = await prisma.invoice.findMany({
    where: {
      createdAt: { gte: from, lte: to },
      ...(filters?.orderId && { orderId: filters.orderId }),
      ...(filters?.organizationId && { order: { organizationId: filters.organizationId } }),
    },
    include: {
      items: true,
      payments: true,
      order: { select: { id: true, orderNumber: true, projectName: true, organization: { select: { id: true, name: true } } } },
    },
  });

  const byMonth = new Map<string, { invoiced: number; paid: number }>();
  const byCustomer = new Map<string, { name: string; invoiced: number; paid: number }>();
  const byOrder = new Map<string, { label: string; invoiced: number; paid: number }>();

  for (const inv of invoices) {
    const invTotal = inv.items.reduce(
      (s, i) => s + Number(i.quantity) * Number(i.unitPrice),
      0
    );
    const paid = inv.payments.reduce((s, p) => s + Number(p.amount), 0);
    const monthKey = `${inv.createdAt.getFullYear()}-${String(inv.createdAt.getMonth() + 1).padStart(2, "0")}`;

    const mEntry = byMonth.get(monthKey) ?? { invoiced: 0, paid: 0 };
    mEntry.invoiced += invTotal;
    mEntry.paid += paid;
    byMonth.set(monthKey, mEntry);

    if (inv.order?.organization) {
      const custKey = inv.order.organization.id;
      const cust = byCustomer.get(custKey) ?? { name: inv.order.organization.name, invoiced: 0, paid: 0 };
      cust.invoiced += invTotal;
      cust.paid += paid;
      byCustomer.set(custKey, cust);

      const orderLabel = inv.order.orderNumber || inv.order.projectName || inv.order.id;
      const ord = byOrder.get(inv.order.id) ?? { label: orderLabel, invoiced: 0, paid: 0 };
      ord.invoiced += invTotal;
      ord.paid += paid;
      byOrder.set(inv.order.id, ord);
    }
  }

  const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  return {
    byMonth: Array.from(byMonth.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, v]) => {
        const [y, m] = key.split("-");
        return {
          month: key,
          label: `${months[parseInt(m || "1", 10) - 1]} ${y}`,
          invoiced: Math.round(v.invoiced * 100) / 100,
          paid: Math.round(v.paid * 100) / 100,
          open: Math.round((v.invoiced - v.paid) * 100) / 100,
        };
      }),
    byCustomer: Array.from(byCustomer.entries()).map(([id, v]) => ({
      id,
      name: v.name,
      invoiced: Math.round(v.invoiced * 100) / 100,
      paid: Math.round(v.paid * 100) / 100,
      open: Math.round((v.invoiced - v.paid) * 100) / 100,
    })),
    byOrder: Array.from(byOrder.entries()).map(([id, v]) => ({
      id,
      label: v.label,
      invoiced: Math.round(v.invoiced * 100) / 100,
      paid: Math.round(v.paid * 100) / 100,
      open: Math.round((v.invoiced - v.paid) * 100) / 100,
    })),
  };
}

export async function getOpenItemsData(filters?: ReportingFilters) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessReporting(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      status: { not: "PAID" },
      ...(filters?.orderId && { orderId: filters.orderId }),
      ...(filters?.organizationId && { order: { organizationId: filters.organizationId } }),
    },
    include: {
      items: true,
      payments: true,
      order: { select: { orderNumber: true, projectName: true, organization: { select: { id: true, name: true } } } },
    },
  });

  const now = new Date();
  const items: {
    id: string;
    number: string;
    dueDate: string;
    total: number;
    paid: number;
    open: number;
    daysOverdue: number;
    aging: string;
    customerName: string;
    orderLabel: string;
  }[] = [];

  for (const inv of invoices) {
    const total = inv.items.reduce(
      (s, i) => s + Number(i.quantity) * Number(i.unitPrice),
      0
    );
    const paid = inv.payments.reduce((s, p) => s + Number(p.amount), 0);
    const open = total - paid;
    if (open <= 0) continue;

    const dueDate = new Date(inv.dueDate);
    const daysOverdue = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
    let aging: string;
    if (daysOverdue <= 0) aging = "0-30";
    else if (daysOverdue <= 30) aging = "0-30";
    else if (daysOverdue <= 60) aging = "31-60";
    else if (daysOverdue <= 90) aging = "61-90";
    else aging = "90+";

    items.push({
      id: inv.id,
      number: inv.number,
      dueDate: new Date(inv.dueDate).toISOString(),
      total,
      paid,
      open,
      daysOverdue,
      aging,
      customerName: inv.order?.organization?.name ?? "–",
      orderLabel: inv.order?.orderNumber || inv.order?.projectName || "–",
    });
  }

  const byAging = Array.from(
    items.reduce((acc, i) => {
      const v = acc.get(i.aging) ?? 0;
      acc.set(i.aging, v + i.open);
      return acc;
    }, new Map<string, number>())
  ).map(([aging, sum]) => ({ aging, sum }));

  return { items, byAging };
}

export async function getBudgetVsActualData(filters?: ReportingFilters) {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessReporting(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const { from, to } = filters?.dateFrom && filters?.dateTo
    ? { from: filters.dateFrom, to: filters.dateTo }
    : (filters?.year ? getYearRange(filters.year) : getDefaultDateRange(filters?.month, filters?.year));

  const yearMonthFrom = `${from.getFullYear()}-${String(from.getMonth() + 1).padStart(2, "0")}`;
  const yearMonthTo = `${to.getFullYear()}-${String(to.getMonth() + 1).padStart(2, "0")}`;

  const orders = await prisma.order.findMany({
    where: {
      ...(filters?.organizationId && { organizationId: filters.organizationId }),
      ...(filters?.orderId && { id: filters.orderId }),
    },
    include: {
      organization: { select: { name: true } },
      budgetPlans: {
        include: { months: true },
        orderBy: { version: "desc" },
      },
      actualCosts: true,
      expenseActualCosts: { where: { paidAt: { gte: from, lte: to } } },
    },
  });

  const rows: {
    orderId: string;
    orderLabel: string;
    customerName: string;
    plannedPersonnel: number;
    plannedExternal: number;
    plannedInfrastructure: number;
    plannedRevenue: number;
    plannedTotal: number;
    actualBudget: number;
    actualExpense: number;
    actualTotal: number;
    variance: number;
  }[] = [];

  for (const order of orders) {
    const bp = order.budgetPlans[0];
    const monthsInRange = bp?.months.filter(
      (m) => m.yearMonth >= yearMonthFrom && m.yearMonth <= yearMonthTo
    ) ?? [];

    const plannedPersonnel = monthsInRange.reduce((s, m) => s + Number(m.plannedPersonnel || 0), 0);
    const plannedExternal = monthsInRange.reduce((s, m) => s + Number(m.plannedExternal || 0), 0);
    const plannedInfrastructure = monthsInRange.reduce((s, m) => s + Number(m.plannedInfrastructure || 0), 0);
    const plannedRevenue = monthsInRange.reduce((s, m) => s + Number(m.plannedRevenue || 0), 0);
    const plannedTotal = plannedPersonnel + plannedExternal + plannedInfrastructure;

    const actualBudget = order.actualCosts
      .filter((c) => {
        const ym = c.assignedMonth;
        return ym >= yearMonthFrom && ym <= yearMonthTo;
      })
      .reduce((s, c) => s + Number(c.amount), 0);
    const actualExpense = order.expenseActualCosts.reduce((s, c) => s + Number(c.amount), 0);
    const actualTotal = actualBudget + actualExpense;

    const variance = actualTotal - plannedTotal;

    rows.push({
      orderId: order.id,
      orderLabel: order.orderNumber || order.projectName || order.id,
      customerName: order.organization.name,
      plannedPersonnel,
      plannedExternal,
      plannedInfrastructure,
      plannedRevenue,
      plannedTotal,
      actualBudget,
      actualExpense,
      actualTotal,
      variance,
    });
  }

  return { rows };
}

export async function getReportingFiltersData() {
  const session = await getServerSession(authOptions);
  if (!session || !canAccessReporting(session.user.role)) {
    throw new Error("Nicht berechtigt");
  }

  const [organizations, orders] = await Promise.all([
    prisma.organization.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    prisma.order.findMany({
      select: { id: true, orderNumber: true, projectName: true },
      orderBy: { orderNumber: "asc" },
    }),
  ]);

  return { organizations, orders };
}
