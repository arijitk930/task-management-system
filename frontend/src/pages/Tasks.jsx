import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const Tasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null); // task object
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/project/${projectId}`);
      setTasks(res.data.data);
    } catch {
      alert("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      await api.post(`/tasks/project/${projectId}`, {
        title,
        description: description || undefined,
        priority,
        dueDate: dueDate || undefined,
        assignedTo: assignedTo || undefined,
      });
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setAssignedTo("");
      fetchTasks();
    } catch {
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      fetchTasks();
    } catch {
      alert("Failed to update status");
    }
  };

  const openEdit = (task) => {
    setEditing({
      ...task,
      assignedTo:
        typeof task.assignedTo === "string"
          ? task.assignedTo
          : task.assignedTo?._id || "",
      dueDate: task.dueDate ? String(task.dueDate).slice(0, 10) : "",
    });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editing?.title?.trim()) return alert("Title required");
    try {
      setSavingEdit(true);
      await api.patch(`/tasks/${editing._id}`, {
        title: editing.title,
        description: editing.description || undefined,
        priority: editing.priority,
        dueDate: editing.dueDate || undefined,
        assignedTo: editing.assignedTo || undefined,
        status: editing.status,
      });
      setEditing(null);
      fetchTasks();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update task");
    } finally {
      setSavingEdit(false);
    }
  };

  const deleteTask = async (taskId) => {
    const ok = confirm("Delete this task?");
    if (!ok) return;
    try {
      setDeletingId(taskId);
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete task");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>

      {/* Create Task */}
      <form
        onSubmit={handleCreateTask}
        className="bg-white p-4 rounded-lg shadow mb-6 max-w-md space-y-3"
      >
        <h2 className="font-semibold">Create Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Assign to (User ID - optional)"
          className="w-full border p-2 rounded"
        />

        <button
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Creating..." : "Add Task"}
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3 max-w-2xl">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-start gap-4"
          >
            <div>
              <h3 className="font-medium">{task.title}</h3>
              {task.description ? (
                <p className="text-sm text-gray-700 mt-1">{task.description}</p>
              ) : null}
              <div className="text-sm text-gray-500 mt-1 space-y-0.5">
                <div>Priority: {task.priority || "medium"}</div>
                {task.dueDate ? (
                  <div>Due: {String(task.dueDate).slice(0, 10)}</div>
                ) : null}
                {task.assignedTo ? (
                  <div>
                    Assigned:{" "}
                    {typeof task.assignedTo === "string"
                      ? task.assignedTo
                      : `${task.assignedTo?.name || ""}${
                          task.assignedTo?.email ? ` (${task.assignedTo.email})` : ""
                        }`}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <select
                value={task.status}
                onChange={(e) => updateStatus(task._id, e.target.value)}
                className="border rounded p-1"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(task)}
                  className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteTask(task._id)}
                  disabled={deletingId === task._id}
                  className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {deletingId === task._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit modal */}
      {editing ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <form
            onSubmit={saveEdit}
            className="w-full max-w-md bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Edit task</h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-sm px-2 py-1 rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>

            <input
              value={editing.title || ""}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="Task title"
              className="w-full border p-2 rounded"
              required
            />

            <textarea
              value={editing.description || ""}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              placeholder="Description"
              className="w-full border p-2 rounded"
            />

            <select
              value={editing.priority || "medium"}
              onChange={(e) =>
                setEditing({ ...editing, priority: e.target.value })
              }
              className="w-full border p-2 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              value={editing.status || "todo"}
              onChange={(e) => setEditing({ ...editing, status: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <input
              type="date"
              value={editing.dueDate || ""}
              onChange={(e) => setEditing({ ...editing, dueDate: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              value={editing.assignedTo || ""}
              onChange={(e) =>
                setEditing({ ...editing, assignedTo: e.target.value })
              }
              placeholder="Assign to (User ID - optional)"
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-3 py-2 rounded border hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                disabled={savingEdit}
                className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {savingEdit ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Tasks;
