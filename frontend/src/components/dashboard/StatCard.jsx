import { FiList, FiClock, FiTrendingUp, FiCheckCircle } from "react-icons/fi";

const config = {
  total: {
    icon: FiList,
    bg: "bg-violet-50",
    text: "text-violet-600",
  },
  todo: {
    icon: FiClock,
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  progress: {
    icon: FiTrendingUp,
    bg: "bg-sky-50",
    text: "text-sky-600",
  },
  done: {
    icon: FiCheckCircle,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
};

export default function StatCard({ label, value, type = "total" }) {
  const c = config[type] ?? config.total;
  const Icon = c.icon;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${c.bg} ${c.text}`}>
        <Icon className="text-xl" />
      </div>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
