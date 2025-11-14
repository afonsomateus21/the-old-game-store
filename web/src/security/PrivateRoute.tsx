import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";

interface PrivateRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

interface TokenPayload {
  isAdmin: boolean;
  email: string;
  id: string 
}

export const PrivateRoute = ({ children, requireAdmin = false }: PrivateRouteProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    if (requireAdmin && !decoded.isAdmin) {
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};
