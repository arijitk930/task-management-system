import TaskItem from "./TaskItem";
import { FiCheckSquare } from "react-icons/fi";

export default function TaskList({
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
  deletingTaskId,
  emptyFilterMessage,
}) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <FiCheckSquare className="mx-auto text-4xl text-slate-300 mb-4" />
        <p className="text-slate-600 font-medium">
          {emptyFilterMessage ? "No matching tasks" : "No tasks yet"}
        </p>
        <p className="text-sm text-slate-500 mt-1">
          {emptyFilterMessage ||
            "Add your first task using the form above."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingTaskId === task._id}
        />
      ))}
    </div>
  );
}
