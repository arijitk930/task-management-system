import { FiFilter, FiSearch } from "react-icons/fi";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function TaskFilter({
  statusFilter,
  onStatusChange,
  searchQuery,
  onSearchChange,
  resultCount,
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <FiFilter className="text-slate-500" />
        <span className="text-sm font-medium text-slate-700">Filter</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Status tabs */}
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onStatusChange(opt.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  statusFilter === opt.value
                    ? "bg-violet-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-0 sm:max-w-xs">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 focus:bg-white"
          />
        </div>
      </div>

      {resultCount !== null && (
        <p className="text-sm text-slate-500 mt-3">
          Showing {resultCount} task{resultCount !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
