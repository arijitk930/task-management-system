import { useDashboard } from "../hooks/useDashboard";
import StatCard from "../components/dashboard/StatCard";
import DashboardTaskList from "../components/dashboard/DashboardTaskList";
import PageLayout from "../components/layout/PageLayout";
import { FiActivity, FiList } from "react-icons/fi";

export default function Dashboard() {
  const { tasks, stats, isLoading, isError, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading dashboard…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-red-600">Failed to load dashboard. {error?.message}</p>
      </div>
    );
  }

  return (
    <PageLayout>
      {/* Page title */}
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-100 text-violet-600">
            <FiActivity className="text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Overview of your tasks
            </p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="mb-8" aria-label="Task statistics">
        <h2 className="sr-only">Task statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Tasks" value={stats.totalTasks} type="total" />
          <StatCard label="Todo" value={stats.todo} type="todo" />
          <StatCard
            label="In Progress"
            value={stats.inProgress}
            type="progress"
          />
          <StatCard label="Done" value={stats.done} type="done" />
        </div>
      </section>

      {/* Recent tasks section */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <FiList className="text-slate-500" />
            <h2 className="text-lg font-semibold text-slate-900">
              Recent tasks
            </h2>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Your latest tasks at a glance
          </p>
        </div>
        <div className="p-6">
          <DashboardTaskList tasks={tasks} />
        </div>
      </section>
    </PageLayout>
  );
}
