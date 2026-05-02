import { useState, useEffect, createContext, type ReactNode } from "react";

export interface ILogIn {
  id: string;
  userName: string;
  email: string;
  phone: string;
  birthDate?: string;
  contactMethod?: string;
  role?: string;
}

type IFullUserInfo = ILogIn & {
  password?: string;
};

export interface IAuthContext {
  currentUser: ILogIn | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<ILogIn | null>>;
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
  allUsers: IFullUserInfo[];
  updatePassword: (newPass: string) => void;
  updateUser: (updatedData: IFullUserInfo) => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [allUsers, setAllUsers] = useState<IFullUserInfo[]>(() => {
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

  const updateUser = (updatedData: IFullUserInfo) => {
    setAllUsers((prevVal) =>
      prevVal.map((user) =>
        user.id === updatedData.id ? { ...user, ...updatedData } : user,
      ),
    );
    const { password, ...safeData } = updatedData;
    setCurrentUser(safeData);
    localStorage.setItem("currentUser", JSON.stringify(safeData));
  };

  const login = (
    email: string,
    pass: string,
    isNewUser: boolean = false,
    userPhone: string = "",
    userName: string = "",
  ) => {
    if (!isNewUser) {
      const user = allUsers.find(
        (u:IFullUserInfo) => u.email === email && u.password === pass,
      );
      if (user) {
        const userData: ILogIn = {
          id: user.id,
          email: user.email,
          phone: user.phone,
          userName: user.userName,
          role: user.role,
          contactMethod: user.contactMethod,
          birthDate: user.birthDate,
        };
        setCurrentUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        setFormLogIn(false);
        return true;
      }
    }
    if (isNewUser) {
      const exists = allUsers.some((u: IFullUserInfo) => u.email === email);
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
      setFormSignUp(false);
      return login(userEmail, pass, true, userPhone, userName);
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const updatePassword = (newPass: string) => {
    if (!currentUser) return;

    setAllUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.email === currentUser.email ? { ...u, password: newPass } : u,
      ),
    );
    updateUser({ ...currentUser, password: newPass });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
        signUp,
        formLogIn,
        setFormLogIn,
        formSignUp,
        setFormSignUp,
        allUsers,
        updatePassword,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
