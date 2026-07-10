import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    null
  );

  useEffect(() => {
    const storedToken =
      localStorage.getItem("access_token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  function login(jwt: string) {
    localStorage.setItem(
      "access_token",
      jwt
    );

    setToken(jwt);
  }

  function logout() {
    localStorage.removeItem(
      "access_token"
    );

    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: token !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}
