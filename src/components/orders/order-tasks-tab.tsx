"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AddTaskModal } from "./add-task-modal";
import { updateOrderTask, deleteOrderTask } from "@/server/actions/order-tasks";

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
  organizationId: string;
}

const taskTypeKeys: Record<string, string> = {
  TODO: "taskTypeTodo",
  REMARK: "taskTypeRemark",
  MILESTONE: "taskTypeMilestone",
  RENEWAL: "taskTypeRenewal",
};

export function OrderTasksTab({ tasks, orderId, organizationId }: OrderTasksTabProps) {
  const t = useTranslations("orders");
  const router = useRouter();
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [editTask, setEditTask] = useState<OrderTask | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const formatDate = (d: Date | string) =>
    typeof d === "string" ? new Date(d).toLocaleDateString("de-CH") : d.toLocaleDateString("de-CH");

  return (
    <div
      className="rounded-lg border overflow-hidden bg-white"
      style={{ borderColor: "#e1dfdd" }}
    >
      <div className="flex justify-between items-center p-3 border-b" style={{ borderColor: "#e1dfdd" }}>
        <h3 className="font-semibold text-zuraio-text">{t("tasks")}</h3>
        <button
          type="button"
          onClick={() => setAddTaskOpen(true)}
          className="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded transition-colors hover:bg-[#DCE6B5]"
          style={{ color: "#9FAF52" }}
        >
          <Plus className="h-4 w-4" />
          {t("addTask")}
        </button>
      </div>
      {tasks.length === 0 ? (
        <div
          className="p-6 text-center text-zuraio-textMuted text-sm cursor-pointer transition-colors hover:bg-[#f8f8f7]"
          onClick={() => setAddTaskOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setAddTaskOpen(true)}
        >
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
                onChange={async () => {
                  await updateOrderTask(task.id, orderId, {
                    completedAt: task.completedAt ? null : new Date(),
                  });
                  router.refresh();
                }}
                className="mt-1 rounded cursor-pointer"
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
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditTask(task)}
                  className="p-1.5 rounded hover:bg-[#DCE6B5]"
                  style={{ color: "#9FAF52" }}
                  title={t("editTask")}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                {deleteConfirmId === task.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zuraio-textMuted">
                      {t("deleteTaskConfirm")}
                    </span>
                    <button
                      type="button"
                      onClick={async () => {
                        await deleteOrderTask(task.id, orderId);
                        setDeleteConfirmId(null);
                        router.refresh();
                      }}
                      className="flex items-center gap-1 px-2 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      {t("deleteTask")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(null)}
                      className="text-xs text-zuraio-textMuted hover:text-zuraio-text"
                    >
                      {t("cancel")}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(task.id)}
                    className="p-1.5 rounded hover:bg-red-50"
                    style={{ color: "#605e5c" }}
                    title={t("deleteTask")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {(addTaskOpen || editTask) && (
        <AddTaskModal
          orderId={orderId}
          organizationId={organizationId}
          task={editTask ?? undefined}
          onClose={() => {
            setAddTaskOpen(false);
            setEditTask(null);
          }}
        />
      )}
    </div>
  );
}
