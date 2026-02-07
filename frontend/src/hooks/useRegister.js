import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

function registerFn(form) {
  return api.post("/users/register", form);
}

export function useRegister() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerFn,
    onSuccess: () => navigate("/login"),
    onError: (error) => {
      alert(error?.response?.data?.message || "Registration failed");
    },
  });

  return {
    register: mutation.mutate,
    isPending: mutation.isPending,
  };
}
