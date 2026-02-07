import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

const STATUS_OPTIONS = [
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function TaskForm({ onSubmit, isSubmitting }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
    });
    setTitle("");
    setDescription("");
    setStatus("todo");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8 space-y-5"
    >
      <div className="flex items-center gap-2">
        <FiPlusCircle className="text-violet-600 text-xl" />
        <h2 className="text-lg font-semibold text-slate-900">New task</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Design landing page"
          required
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details"
          rows={3}
          className="w-full resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Status
        </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full">
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-lg font-medium bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-60 transition-colors"
      >
        {isSubmitting ? "Adding…" : "Add task"}
      </button>
    </form>
  );
}
