import { Link } from "react-router-dom";

const statusStyles = {
  todo: "bg-amber-100 text-amber-800 border-amber-200",
  "in-progress": "bg-sky-100 text-sky-800 border-sky-200",
  done: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

function TaskCard({ task }) {
  const status = task.status ?? "todo";
  return (
    <div
      className="
        flex items-center justify-between gap-4
        p-4 rounded-xl border border-slate-200 bg-white
        hover:border-slate-300 hover:shadow-sm transition-all
      "
    >
      <div className="min-w-0 flex-1">
        <p className="font-medium text-slate-900 truncate">{task.title}</p>
        {task.description && (
          <p className="text-sm text-slate-500 truncate mt-0.5">
            {task.description}
          </p>
        )}
      </div>
      <span
        className={`
          shrink-0 text-xs font-medium capitalize
          px-2.5 py-1 rounded-full border
          ${statusStyles[status]}
        `}
      >
        {status.replace("-", " ")}
      </span>
    </div>
  );
}

export default function DashboardTaskList({ tasks }) {
  const recent = tasks.slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-slate-500">
          No tasks yet.{" "}
          <Link
            to="/tasks"
            className="text-violet-600 hover:text-violet-700 font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {recent.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
      <Link
        to="/tasks"
        className="inline-flex items-center gap-1 mt-5 text-violet-600 hover:text-violet-700 text-sm font-medium"
      >
        View all tasks
        <span aria-hidden>→</span>
      </Link>
    </>
  );
}
