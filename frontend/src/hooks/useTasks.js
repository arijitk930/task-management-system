import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";
import { queryKeys } from "../api/queryKeys";

function fetchTasks() {
  return api.get("/tasks").then((res) => res.data?.data ?? []);
}

export function useTasks() {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: queryKeys.tasks,
    queryFn: fetchTasks,
  });

  const invalidateTasks = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
  };

  const createTaskMutation = useMutation({
    mutationFn: (payload) => api.post("/tasks", payload),
    onSuccess: invalidateTasks,
    onError: () => alert("Failed to create task"),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ taskId, status }) =>
      api.patch(`/tasks/${taskId}/status`, { status }),
    onSuccess: invalidateTasks,
    onError: () => alert("Failed to update status"),
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, title, description, status }) =>
      api.patch(`/tasks/${taskId}`, { title, description, status }),
    onSuccess: invalidateTasks,
    onError: (err) =>
      alert(err?.response?.data?.message || "Failed to update task"),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId) => api.delete(`/tasks/${taskId}`),
    onSuccess: invalidateTasks,
    onError: (err) =>
      alert(err?.response?.data?.message || "Failed to delete task"),
  });

  return {
    tasks: tasksQuery.data ?? [],
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    error: tasksQuery.error,
    createTask: createTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    updateStatus: (taskId, status) =>
      updateStatusMutation.mutate({ taskId, status }),
    updateTask: updateTaskMutation.mutate,
    isUpdating: updateTaskMutation.isPending,
    deleteTask: deleteTaskMutation.mutate,
    isDeleting: deleteTaskMutation.isPending,
    deletingTaskId: deleteTaskMutation.variables,
  };
}
