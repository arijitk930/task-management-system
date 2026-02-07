import { useQuery } from "@tanstack/react-query";
import api from "../api/client";
import { queryKeys } from "../api/queryKeys";

function getMe() {
  return api.get("/users/me").then((res) => res?.data?.data ?? null);
}

export function useMe(options = {}) {
  return useQuery({
    queryKey: queryKeys.me,
    queryFn: getMe,
    ...options,
  });
}
