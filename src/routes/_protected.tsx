import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/use-store";

export function ProtectedRoute() {
  const user = useAppSelector((state) => state.auth);

  if (!user.id) return <Navigate to="/login" />;

  if (user.role === "MEMBER") return <Outlet />;

  return <Navigate to="/login" />;
}
