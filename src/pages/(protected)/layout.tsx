import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "@/layout/AuthProvider";

const ProtectedLayout = () => {

  const navigate = useNavigate();

  const authState = useContext(AuthContext);

  const hasToken =
    localStorage.getItem("accessToken") && localStorage.getItem("refreshToken");

  useEffect(() => {
    if (!hasToken) {
      authState?.logout();
    } else if (authState && !authState.isAuthenticated) {
      authState.handleGetCurrentUser().catch(() => {
        navigate("/login", { replace: true });
      });
    }
  }, [hasToken, authState]);

  if (!hasToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
