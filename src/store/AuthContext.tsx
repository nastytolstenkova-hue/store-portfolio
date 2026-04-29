import { useState, useEffect, createContext, type ReactNode } from "react";
import type { UserInfo } from "./UserContext";

export interface ILogIn extends Pick<
  UserInfo,
  "id" | "userName" | "email" | "phone" | 'birthDate' | 'contactMethod'
> {
  role?: string;
}

export interface IAuthContext {
  currentUser: ILogIn | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  signUp: (
    userEmail: string,
    userPhone: string,
    userName: string,
    pass: string,
    repeatPass: string,
  ) => boolean;
  formLogIn: boolean;
  setFormLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  formSignUp: boolean;
  setFormSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [allUsers, setAllUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentUser, setCurrentUser] = useState<ILogIn | null>(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [formLogIn, setFormLogIn] = useState<boolean>(false);
  const [formSignUp, setFormSignUp] = useState<boolean>(false);

  useEffect(() => {
    if (allUsers.length > 0) {
      localStorage.setItem("users", JSON.stringify(allUsers));
    }
  }, [allUsers]);

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      fetch("/users-seed.json")
        .then((res) => res.json())
        .then((data) => localStorage.setItem("users", JSON.stringify(data)));
    }
  }, []);

  const login = (
    email: string,
    pass: string,
    isNewUser: boolean = false,
    userPhone: string = "",
    userName: string = "",
  ) => {
    if (!isNewUser) {
      const user = allUsers.find(
        (u: any) => u.email === email && u.password === pass,
      );
      if (user) {
        const userData: ILogIn = {
          id: user.id,
          email: user.email,
          phone: user.phone,
          userName: user.userName,
          role: user.role,
        };
        setCurrentUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        setFormLogIn(false)
        return true;
      }
    }
    if (isNewUser) {
      const exists = allUsers.some((u: any) => u.email === email);
      if (exists) return false;

      const userData: ILogIn = {
        id: String(Date.now()),
        email: email,
        phone: userPhone,
        userName,
      };
      setCurrentUser(userData);
      setAllUsers((prevVal) => [...prevVal, { ...userData, password: pass }]);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signUp = (
    userEmail: string,
    userPhone: string,
    userName: string,
    pass: string,
    repeatPass: string,
  ) => {
    if (pass === repeatPass) {
      return login(userEmail, pass, true, userPhone, userName);
      setFormSignUp(false)
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, signUp, formLogIn, setFormLogIn, formSignUp, setFormSignUp }}>
      {children}
    </AuthContext.Provider>
  );
}
