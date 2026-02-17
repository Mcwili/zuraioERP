"use client";

import { useTranslations } from "next-intl";

interface OrderTask {
  id: string;
  type: string;
  title: string;
  dueDate: Date | null;
  completedAt: Date | null;
  notes: string | null;
}

interface OrderTasksTabProps {
  tasks: OrderTask[];
  orderId: string;
}

const taskTypeKeys: Record<string, string> = {
  MILESTONE: "taskTypeMilestone",
  RENEWAL: "taskTypeRenewal",
  TODO: "taskTypeTodo",
};

export function OrderTasksTab({ tasks, orderId }: OrderTasksTabProps) {
  const t = useTranslations("orders");

  const formatDate = (d: Date) => d.toLocaleDateString("de-CH");

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="p-3 border-b" style={{ borderColor: "#e1dfdd" }}>
        <h3 className="font-semibold text-zuraio-text">{t("tasks")}</h3>
      </div>
      {tasks.length === 0 ? (
        <div className="p-6 text-center text-zuraio-textMuted text-sm">
          {t("noTasks")}
        </div>
      ) : (
        <ul className="divide-y" style={{ borderColor: "#e1dfdd" }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 flex items-start gap-3 transition-colors hover:bg-[#DCE6B5]"
            >
              <input
                type="checkbox"
                checked={!!task.completedAt}
                readOnly
                className="mt-1 rounded"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: "#f8f8f7", color: "#605e5c" }}
                  >
                    {t(taskTypeKeys[task.type] || "taskTypeTodo")}
                  </span>
                  <span className="font-medium text-zuraio-text">{task.title}</span>
                </div>
                <div className="flex gap-4 mt-1 text-sm text-zuraio-textMuted">
                  {task.dueDate && (
                    <span>Fällig: {formatDate(task.dueDate)}</span>
                  )}
                  {task.completedAt && (
                    <span>Erledigt: {formatDate(task.completedAt)}</span>
                  )}
                </div>
                {task.notes && (
                  <p className="mt-1 text-sm text-zuraio-textMuted">{task.notes}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
