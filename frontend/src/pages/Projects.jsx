import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null); // {_id, title, description}
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.data);
    } catch {
      alert("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");

    try {
      setLoading(true);
      await api.post("/projects", { title, description });
      setTitle("");
      setDescription("");
      fetchProjects();
    } catch {
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (project) => {
    setEditing({
      _id: project._id,
      title: project.title || "",
      description: project.description || "",
    });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editing?.title?.trim()) return alert("Title required");
    try {
      setSavingEdit(true);
      await api.patch(`/projects/${editing._id}`, {
        title: editing.title,
        description: editing.description,
      });
      setEditing(null);
      fetchProjects();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update project");
    } finally {
      setSavingEdit(false);
    }
  };

  const deleteProject = async (projectId) => {
    const ok = confirm("Delete this project (and its tasks)?");
    if (!ok) return;
    try {
      setDeletingId(projectId);
      await api.delete(`/projects/${projectId}`);
      fetchProjects();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete project");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {/* Create Project */}
      <form
        onSubmit={handleCreateProject}
        className="bg-white p-4 rounded-lg shadow mb-6 max-w-md"
      >
        <h2 className="font-semibold mb-2">Create Project</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="w-full border p-2 rounded mb-2"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full border p-2 rounded mb-3"
        />

        <button
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {/* Project List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/projects/${project._id}`)}
            className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold">{project.title}</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEdit(project);
                  }}
                  className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProject(project._id);
                  }}
                  disabled={deletingId === project._id}
                  className="text-xs px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                >
                  {deletingId === project._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {project.description || "No description"}
            </p>
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
              <h2 className="font-semibold">Edit project</h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-sm px-2 py-1 rounded hover:bg-gray-100"
              >
                Close
              </button>
            </div>

            <input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="Project title"
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              placeholder="Description (optional)"
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

export default Projects;
