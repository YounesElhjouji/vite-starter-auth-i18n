import { Navigate } from "react-router-dom";

interface RequireAuthProps {
  username: string | null;
  children: React.ReactNode;
}

export default function RequireAuth({ username, children }: RequireAuthProps) {
  if (!username) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
