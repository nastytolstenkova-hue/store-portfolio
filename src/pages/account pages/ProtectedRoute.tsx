import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UseAuthContext from "../../hooks/UseAuthContext";

export default function ProtectedRoute() {
  const { currentUser, setFormLogIn } = UseAuthContext();

  useEffect(() => {
    if (!currentUser) {
      setFormLogIn(true);
    }
  }, [currentUser, setFormLogIn]);

  if (!currentUser) {
    return <Navigate to="/main" replace />;
  }

  return <Outlet />;
}