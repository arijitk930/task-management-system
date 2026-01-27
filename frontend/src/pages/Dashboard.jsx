import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const projectRes = await api.get("/projects");
      const projectsData = projectRes.data.data;
      setProjects(projectsData);

      let totalTasks = 0;
      let todo = 0;
      let inProgress = 0;
      let done = 0;

      for (const project of projectsData) {
        const taskRes = await api.get(`/tasks/project/${project._id}`);
        const tasks = taskRes.data.data;

        totalTasks += tasks.length;
        tasks.forEach((task) => {
          if (task.status === "todo") todo++;
          if (task.status === "in-progress") inProgress++;
          if (task.status === "done") done++;
        });
      }

      setStats({ totalTasks, todo, inProgress, done });
    } catch {
      alert("Failed to load dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Projects" value={projects.length} />
        <StatCard label="Total Tasks" value={stats.totalTasks} />
        <StatCard label="Todo" value={stats.todo} />
        <StatCard label="Done" value={stats.done} />
      </div>

      {/* Project List */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">Projects</h2>

        {projects.length === 0 && (
          <p className="text-gray-500">No projects yet</p>
        )}

        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>{project.title}</span>
              <Link
                to={`/projects/${project._id}`}
                className="text-indigo-600 hover:underline text-sm"
              >
                View Tasks
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-lg shadow p-4 text-center">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
