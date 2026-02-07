import { useQuery } from "@tanstack/react-query";
import api from "../api/client";
import { queryKeys } from "../api/queryKeys";

function fetchTasks() {
  return api.get("/tasks").then((res) => res.data?.data ?? []);
}

function getStats(tasks) {
  let todo = 0;
  let inProgress = 0;
  let done = 0;
  tasks.forEach((task) => {
    if (task.status === "todo") todo++;
    else if (task.status === "in-progress") inProgress++;
    else if (task.status === "done") done++;
  });
  return {
    totalTasks: tasks.length,
    todo,
    inProgress,
    done,
  };
}

export function useDashboard() {
  const tasksQuery = useQuery({
    queryKey: queryKeys.tasks,
    queryFn: fetchTasks,
  });

  const tasks = tasksQuery.data ?? [];
  const stats = getStats(tasks);

  return {
    tasks,
    stats,
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    error: tasksQuery.error,
  };
}
