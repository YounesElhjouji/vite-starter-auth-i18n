import { Navigate } from "react-router-dom";

interface RedirectIfAuthProps {
  username: string | null;
  children: React.ReactNode;
}

export default function RedirectIfAuth({
  username,
  children,
}: RedirectIfAuthProps) {
  if (username) {
    // Redirect to home if already authenticated
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
