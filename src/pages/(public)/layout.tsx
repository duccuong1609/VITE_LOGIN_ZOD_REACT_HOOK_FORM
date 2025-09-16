import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (accessToken && refreshToken) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default PublicLayout;