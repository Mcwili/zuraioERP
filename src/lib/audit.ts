import { prisma } from "./prisma";

export async function logAudit(params: {
  userId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  oldValues?: Record<string, unknown> | null;
  newValues?: Record<string, unknown> | null;
  ipAddress?: string | null;
}) {
  await prisma.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      oldValues: params.oldValues ? JSON.parse(JSON.stringify(params.oldValues)) : undefined,
      newValues: params.newValues ? JSON.parse(JSON.stringify(params.newValues)) : undefined,
      ipAddress: params.ipAddress,
    },
  });
}
