import { useRef, useCallback, useState } from "react";
import authService from "@/services/auth.service";
import type { LoginFormData } from "@/type";
import type { UserProps } from "@/services/type";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuth = () => {

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const fetchedUser = useRef(false);

  const handleLogin = useCallback(async (data: LoginFormData) => {
    const res = await authService.login(data);

    if (res.accessToken && res.refreshToken) {
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);

      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);

      fetchedUser.current = false;

      navigate("/dashboard");
    }
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setCurrentUser(null);
    setIsAuthenticated(false);
    fetchedUser.current = false;
    navigate("/login");
  } , []);

  const handleGetCurrentUser = useCallback(async () => {
    setIsLoading(true);
    if (fetchedUser.current) {
      setIsLoading(false);
      return;
    }
    fetchedUser.current = true;

    const token = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");

    if (!token || !refresh) throw new Error("Token not found");
    
    try {
      const res = await authService.getCurrentUser();
      if (res) {
        setCurrentUser(res);
        setIsAuthenticated(true);
        fetchedUser.current = true;
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      fetchedUser.current = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw error;
    } finally {
      setIsLoading(false);
    }
    
  }, []);

  return {
    accessToken,
    isLoading,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    handleLogin,
    isAuthenticated,
    logout,
    handleGetCurrentUser,
    currentUser,
  };
};

export default useAuth;
export type AuthType = ReturnType<typeof useAuth>;