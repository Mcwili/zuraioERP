-- Migration: Alte Kostenarten auf neue Werte mappen
-- Vor prisma db push ausführen, falls noch Daten mit PERSONNEL/EXTERNAL/INFRASTRUCTURE existieren.
-- Mapping: PERSONNEL -> LOHN, EXTERNAL -> SONSTIGES, INFRASTRUCTURE -> INFORMATIK

-- Zuerst neue Enum-Werte hinzufügen (falls noch nicht vorhanden)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'LOHN' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'ExpenseCostType')) THEN
    ALTER TYPE "ExpenseCostType" ADD VALUE 'LOHN';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'SPESEN' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'ExpenseCostType')) THEN
    ALTER TYPE "ExpenseCostType" ADD VALUE 'SPESEN';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'AUS_WEITERBILDUNG' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'ExpenseCostType')) THEN
    ALTER TYPE "ExpenseCostType" ADD VALUE 'AUS_WEITERBILDUNG';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'SONSTIGES' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'ExpenseCostType')) THEN
    ALTER TYPE "ExpenseCostType" ADD VALUE 'SONSTIGES';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'BUCHFUEHRUNG' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'ExpenseCostType')) THEN
    ALTER TYPE "ExpenseCostType" ADD VALUE 'BUCHFUEHRUNG';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'FAHRZEUG' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'ExpenseCostType')) THEN
    ALTER TYPE "ExpenseCostType" ADD VALUE 'FAHRZEUG';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'INFORMATIK' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'ExpenseCostType')) THEN
    ALTER TYPE "ExpenseCostType" ADD VALUE 'INFORMATIK';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'UNTERHALT_REPARATUR_ERSATZ' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'ExpenseCostType')) THEN
    ALTER TYPE "ExpenseCostType" ADD VALUE 'UNTERHALT_REPARATUR_ERSATZ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'VERWALTUNG' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'ExpenseCostType')) THEN
    ALTER TYPE "ExpenseCostType" ADD VALUE 'VERWALTUNG';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'WERBUNG_AKQUISITION' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'ExpenseCostType')) THEN
    ALTER TYPE "ExpenseCostType" ADD VALUE 'WERBUNG_AKQUISITION';
  END IF;
END
$$;

-- Bestehende Daten migrieren
UPDATE planned_expenses SET cost_type = 'LOHN' WHERE cost_type = 'PERSONNEL';
UPDATE planned_expenses SET cost_type = 'SONSTIGES' WHERE cost_type = 'EXTERNAL';
UPDATE planned_expenses SET cost_type = 'INFORMATIK' WHERE cost_type = 'INFRASTRUCTURE';

-- budget_actual_costs: cost_type ist String, keine Enum-Änderung nötig
