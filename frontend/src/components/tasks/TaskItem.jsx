const STATUS_OPTIONS = [
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const statusPillStyles = {
  todo: "bg-amber-100 text-amber-800 border-amber-200",
  "in-progress": "bg-sky-100 text-sky-800 border-sky-200",
  done: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export default function TaskItem({
  task,
  onStatusChange,
  onEdit,
  onDelete,
  isDeleting,
}) {
  const status = task.status ?? "todo";

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md hover:border-slate-300 transition-all h-full">
      <div className="min-w-0 flex-1 flex flex-col gap-2">
        <h3 className="font-semibold text-slate-900 truncate">{task.title}</h3>
        {task.description && (
          <p className="text-sm text-slate-600 line-clamp-2 flex-1">
            {task.description}
          </p>
        )}
        <span
          className={`inline-flex w-fit text-xs font-medium capitalize px-2.5 py-1 rounded-full border ${statusPillStyles[status]}`}
        >
          {status.replace("-", " ")}
        </span>
      </div>

      <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
        <select
          value={status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className="w-full text-sm rounded-lg border-slate-200 bg-slate-50 text-slate-700 focus:ring-violet-500 focus:border-violet-500"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task._id)}
            disabled={isDeleting}
            className="flex-1 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
