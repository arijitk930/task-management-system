import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

function loginFn(form) {
  return api.post("/users/login", form);
}

export function useLogin() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (res) => {
      const accessToken =
        res?.data?.data?.accessToken || res?.data?.accessToken || "";
      const refreshToken =
        res?.data?.data?.refreshToken || res?.data?.refreshToken || "";
      if (accessToken) localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "Login failed");
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
  };
}
