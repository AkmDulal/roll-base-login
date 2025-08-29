import type { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Role } from "../types";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: PropsWithChildren<{ allowedRoles: Role[] }>) {
  const { token, role } = useSelector((s: RootState) => s.auth);
  const location = useLocation();
  const ok = token && role && allowedRoles.includes(role);
  if (!ok) {
    const first = allowedRoles[0];
    const loginPath =
      first === "admin"
        ? "/login/admin"
        : first === "merchant"
        ? "/login/merchant"
        : "/login/member";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
