import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "@/layout/AuthProvider";
import type { IRefreshServiceParams } from "@/services/type";
import { REFRESH_TOKEN_SECOND } from "@/config";

const ProtectedLayout = () => {
  const navigate = useNavigate();

  const authState = useContext(AuthContext);

  const hasToken =
    localStorage.getItem("accessToken") ||
    (sessionStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")) ||
    sessionStorage.getItem("refreshToken");

  useEffect(() => {
    const token =
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("refreshToken");

    const data: IRefreshServiceParams = {
      refreshToken: token ?? "",
      expiresInMins: 30,
    };

    const refreshTokenInterval = setInterval(() => {
      authState?.handleRefreshToken(data);
    }, REFRESH_TOKEN_SECOND);

    return () => clearInterval(refreshTokenInterval);
  }, [hasToken, authState]);

  useEffect(() => {
    if (authState?.currentUser) {
      return;
    }
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
