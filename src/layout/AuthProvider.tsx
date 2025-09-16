import type { AuthType } from "@/hooks/useAuth";
import useAuth from "@/hooks/useAuth";
import React, { type ReactNode } from "react";

export const AuthContext = React.createContext<AuthType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authState = useAuth();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
