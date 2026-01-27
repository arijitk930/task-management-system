import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // cookies (optional) + refresh-token compatibility
});

// Attach access token (supports local dev when secure cookies won't set on http)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh-on-401 once per request
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;

    if (!originalRequest || status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const refreshRes = await api.post("/users/refresh-token", {
        refreshToken,
      });
      const newAccessToken =
        refreshRes?.data?.data?.accessToken || refreshRes?.data?.accessToken;
      const newRefreshToken =
        refreshRes?.data?.data?.refreshToken || refreshRes?.data?.refreshToken;

      if (newAccessToken) localStorage.setItem("accessToken", newAccessToken);
      if (newRefreshToken) localStorage.setItem("refreshToken", newRefreshToken);

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshErr) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return Promise.reject(refreshErr);
    }
  },
);

export default api;
