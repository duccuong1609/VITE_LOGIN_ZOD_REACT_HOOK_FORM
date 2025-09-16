import { useRef, useCallback, useState } from "react";
import authService from "@/services/auth.service";
import type { LoginFormData } from "@/type";
import type { IRefreshServiceParams, UserProps } from "@/services/type";
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

      if(data.rememberMe) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
      }
      else{
        sessionStorage.setItem("accessToken", res.accessToken);
        sessionStorage.setItem("refreshToken", res.refreshToken);
      }

      fetchedUser.current = false;

      navigate("/dashboard", { replace: true });
    }
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    setCurrentUser(null);
    setIsAuthenticated(false);
    fetchedUser.current = false;
    navigate("/login");
  } , []);

  const handleRefreshToken = useCallback(async (data: IRefreshServiceParams) => {
    try {
      const res = await authService.getRefreshToken(data);
      if (res.refreshToken) {
        setAccessToken(res.accessToken);
        setRefreshToken(res.refreshToken);
        const localToken = localStorage.getItem("accessToken");
        const sessionToken = sessionStorage.getItem("accessToken");
        if (localToken) {
          localStorage.setItem("accessToken", res.accessToken);
        } else if (sessionToken) {
          sessionStorage.setItem("accessToken", res.accessToken);
        }
      }
    } catch (error) {
      logout();
      toast.error("Something went wrong with refresh token, please try again later.");
      throw error;
    }
  }, [])

  const handleGetCurrentUser = useCallback(async () => {
    setIsLoading(true);
    if (fetchedUser.current) {
      setIsLoading(false);
      return;
    }
    fetchedUser.current = true;

    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");

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
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
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
    handleRefreshToken
  };
};

export default useAuth;
export type AuthType = ReturnType<typeof useAuth>;