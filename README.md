# 🚀 React Authentication Starter

This project implements a simple **authentication flow** using:

* ⚛️ **React + Vite**
* 📦 **React Router v6** (public & protected layouts)
* 🪝 **Context API** (AuthProvider + custom `useAuth` hook)
* 📝 **react-hook-form** + **zod** (form validation)
* 🎨 **shadcn/ui** (Card, Button, Skeleton, etc.)
* 🌐 **Axios** (custom axios instance with request wrapper)

---

## 📂 Project Structure

```
src/
├── api/
│   ├── axiosInstance.ts       # Axios instances (public & private)
│   └── request.ts             # Request wrapper
├── apps/
│   └── dashboard/
│       └── components/
│           └── UserInfoCard.tsx # Example dashboard component
├── components/
│   └── ui/                    # shadcn/ui components
│       └── login-form.tsx
├── hooks/
│   └── useAuth.ts             # Custom authentication hook
├── layout/
│   └── AuthProvider.tsx       # Provides AuthContext
├── pages/
│   ├── (public)/
│   │   ├── login/
│   │   │   └── index.tsx      # Login page
│   │   ├── home.tsx
│   │   └── layout.tsx         # PublicLayout
│   └── (protected)/
│       ├── dashboard/
│       │   └── index.tsx      # Dashboard page
│       └── layout.tsx         # ProtectedLayout
├── services/
│   └── auth.service.ts        # API services for auth
├── type/
│   └── index.ts               # Shared types
├── validation/
│   ├── login-validation.ts
│   ├── password-validation.ts
│   └── username-validation.ts
└── App.tsx                    # App entrypoint (routes)
```

---

## 🔑 Auth Flow

1. **Login**

   * User submits login form (validated by `zod`).
   * Calls `authService.login()` → returns `accessToken` & `refreshToken`.
   * Tokens are stored in `localStorage` & state.
   * Redirects to `/dashboard`.

2. **ProtectedLayout**

   * Checks if tokens exist in `localStorage`.
   * If yes → calls `handleGetCurrentUser()`.
   * Displays **Skeleton loader** until user data is fetched.
   * If no tokens or request fails → redirect `/login`.

```tsx
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
```

3. **Logout**

   * Clears tokens from `localStorage`.
   * Resets auth state.
   * Redirects to `/login`.

4. **PublicLayout**

   * If tokens exist → redirect `/dashboard`.
   * Otherwise → render public pages.

```tsx
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
```

---

## 📝 Example: Login Form

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useContext } from "react";
import { AuthContext } from "@/layout/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import loginSchema from "@/validation/login-validation";

export default function LoginForm() {
  const authState = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: any) => {
    authState?.handleLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-sm mx-auto">
      <Input placeholder="Username" {...register("username")} />
      {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

      <Input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      <Button type="submit" className="w-full">Login</Button>
    </form>
  );
}
```
---
## Example: Axios
```tsx
  import axios from "axios";

  export const msAxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API}/`,
    timeout: 60 * 1000, // 60s timeout
  });

  // ✅ Interceptor để mỗi request đều tự động lấy token mới nhất
  msAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  });

  export const msPublicAxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API}/`,
    timeout: 60 * 1000,
  });
```

---

## 📝 Example: Hook

```tsx
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
```

---

## 🎨 Dashboard with Skeleton

```tsx
<Card className="max-w-md mx-auto shadow-md rounded-2xl">
  {isLoading ? (
    <Skeleton className="h-6 w-32" />
  ) : (
    <>
      <CardHeader className="flex flex-col items-center gap-2">
        <img src={user.image} alt="Avatar" className="w-24 h-24 rounded-full border" />
        <CardTitle>{user.username}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between"><span>First Name</span><span>{user.firstName}</span></div>
        <div className="flex justify-between"><span>Last Name</span><span>{user.lastName}</span></div>
      </CardContent>
    </>
  )}
</Card>
```

---

## ✅ Features

* Token-based authentication with `localStorage`
* Auto redirect between public/protected routes
* Skeleton loaders for smoother UX
* Context-based state (AuthContext)
* Form validation with zod

---

## 🚦 Next Steps

* Add refresh token logic
* Improve error handling (401, expired session)
* Persist `isAuthenticated` across refresh
* Role-based access control (admin, user)
* Context phân tách: Nếu app lớn hơn, tách AuthContext chỉ chứa state user/token, còn phần logic fetch/login/logout có thể để trong custom hook (useAuth) để tránh context quá nặng.
* Skeleton: Cậu để loading logic ở ProtectedLayout là chuẩn. Tuy nhiên nên wrap thêm Suspense (nếu có dynamic import) để tận dụng lazy loading.
* Error boundary: Nếu fetch user lỗi (ví dụ token hết hạn) thì nên redirect ra login, tránh stuck ở màn skeleton.#   V I T E _ L O G I N _ Z O D _ R E A C T _ H O O K _ F O R M 
 
 
