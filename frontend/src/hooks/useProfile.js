import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/client";
import { queryKeys } from "../api/queryKeys";

function getMe() {
  return api.get("/users/me").then((res) => res?.data?.data ?? null);
}

export function useProfile() {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: queryKeys.me,
    queryFn: getMe,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (payload) => api.patch("/users/me", payload),
    onSuccess: (res) => {
      const user = res?.data?.data ?? null;
      queryClient.setQueryData(queryKeys.me, user);
      alert("Profile updated");
    },
    onError: (err) =>
      alert(err?.response?.data?.message || "Failed to update profile"),
  });

  const changePasswordMutation = useMutation({
    mutationFn: (payload) => api.patch("/users/change-password", payload),
    onSuccess: () => alert("Password updated"),
    onError: (err) =>
      alert(err?.response?.data?.message || "Failed to change password"),
  });

  return {
    me: meQuery.data ?? null,
    isLoading: meQuery.isLoading,
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    changePassword: changePasswordMutation.mutate,
    isChangingPassword: changePasswordMutation.isPending,
  };
}
