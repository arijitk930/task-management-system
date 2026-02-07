import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => api.post("/users/logout"),
    onSettled: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.clear(); // Clear all cached data so next user doesn't see previous user's data
      navigate("/login");
    },
  });

  return {
    logout: mutation.mutate,
    isPending: mutation.isPending,
  };
}
