import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export function useLogout() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => api.post("/users/logout"),
    onSettled: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    },
  });

  return {
    logout: mutation.mutate,
    isPending: mutation.isPending,
  };
}
