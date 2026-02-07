
import { Navigate } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import Navbar from "./Navbar";

export default function ProtectedRoute({ children }) {
  const { isLoading, isSuccess, isError } = useMe({
    retry: false,
    staleTime: 0,
  });

  if (isLoading) return null;
  if (isError) return <Navigate to="/login" />;
  if (isSuccess)
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        {children}
      </div>
    );
  return null;
}
