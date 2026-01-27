import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "./Navbar";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    api
      .get("/users/me")
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  return authorized ? (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {children}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
