import { useState, useMemo } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskForm from "../components/tasks/TaskForm";
import TaskFilter from "../components/tasks/TaskFilter";
import TaskList from "../components/tasks/TaskList";
import EditTaskModal from "../components/tasks/EditTaskModal";
import PageLayout from "../components/layout/PageLayout";
import { FiCheckSquare } from "react-icons/fi";

export default function Tasks() {
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    tasks,
    isLoading,
    isError,
    createTask,
    isCreating,
    updateStatus,
    updateTask,
    isUpdating,
    deleteTask,
    deletingTaskId,
  } = useTasks();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        task.title?.toLowerCase().includes(searchQuery.trim().toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [tasks, statusFilter, searchQuery]);

  const handleCreateTask = (payload) => createTask(payload);

  const handleSaveEdit = (payload) => {
    if (!editingTask?._id) return;
    updateTask({ taskId: editingTask._id, ...payload });
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (!confirm("Delete this task?")) return;
    deleteTask(taskId);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <p className="text-slate-500">Loading tasks…</p>
      </PageLayout>
    );
  }
  if (isError) {
    return (
      <PageLayout>
        <p className="text-red-600">Failed to load tasks.</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-violet-100 text-violet-600">
          <FiCheckSquare className="text-xl" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Tasks</h1>
      </div>

      <TaskForm onSubmit={handleCreateTask} isSubmitting={isCreating} />

      <TaskFilter
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultCount={filteredTasks.length}
      />

      <TaskList
        tasks={filteredTasks}
        onStatusChange={updateStatus}
        onEdit={setEditingTask}
        onDelete={handleDeleteTask}
        deletingTaskId={deletingTaskId}
        emptyFilterMessage={
          filteredTasks.length === 0 && tasks.length > 0
            ? "No tasks match your filter. Try changing the filter or search."
            : undefined
        }
      />

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleSaveEdit}
          onClose={() => setEditingTask(null)}
          isSaving={isUpdating}
        />
      )}
    </PageLayout>
  );
}
