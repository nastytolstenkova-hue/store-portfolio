import { useState, useEffect, createContext, type ReactNode } from "react";
import type { UserInfo } from "./UserContext";

export interface ILogIn extends Pick<UserInfo, "id" | "userName" | "email"> {
  role?: string;
}

export interface IAuthContext {
  currentUser: ILogIn | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<ILogIn | null>(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      fetch("/users-seed.json")
        .then((res) => res.json())
        .then((data) => localStorage.setItem("users", JSON.stringify(data)));
    }
  }, []);

  const login = (email: string, pass: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u: any) => u.email === email && u.password === pass,
    );

    if (user) {
      const userData: ILogIn = {
        id: user.id,
        email: user.email,
        userName: user.userName,
        role: user.role,
      };
      setCurrentUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signUp = (email: string, pass: string, repeatPass: string) => {
    if (pass === repeatPass) {
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
