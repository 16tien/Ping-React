// components/RequireRole.tsx
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

interface Props {
  allowedRoles: ("admin" | "user")[];
  children: React.ReactNode;
}

export const RequireRole = ({ allowedRoles, children }: Props) => {
  const { user } = useUser();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; 
  }
  
  return <>{children}</>;
};
