const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

function getHeaders() {
  const token = localStorage.getItem("accessToken");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function request(method, path, body) {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const options = {
    method,
    headers: getHeaders(),
    credentials: "include",
  };
  if (body !== undefined) options.body = JSON.stringify(body);

  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data?.message || res.statusText);
    err.response = { status: res.status, data };
    throw err;
  }

  return { data };
}

const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
  patch: (path, body) => request("PATCH", path, body),
  delete: (path) => request("DELETE", path),
};

export default api;
