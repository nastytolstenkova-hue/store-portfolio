import { useState, useEffect, createContext, type ReactNode } from "react";

export interface UserInfo {
  id: number;
  userName: string;
  email: string;
  phone: string;
  birthDate: string;
  contactMethod: string;
}

export interface IUserAddress {
  fullName: string;
  street: string;
  houseNumber: string;
  apartment: string;
  city: string;
  postalCode: string;
  shipMethod: string;
}

export interface IUserContext {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  userAddresses: IUserAddress[];
  setUserAddresses: React.Dispatch<React.SetStateAction<IUserAddress[]>>;
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: 0,
    userName: "",
    email: "",
    phone: "",
    birthDate: "",
    contactMethod: "Email",
  });
  const [userAddresses, setUserAddresses] = useState<IUserAddress[]>([]);

  useEffect(() => {
    fetch("/user-data.json")
      .then((response) => response.json())
      .then((data) => setUserInfo(data))
      .catch((error) => console.error("Loading user info error:", error));
  }, []);

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, userAddresses, setUserAddresses }}
    >
      {children}
    </UserContext.Provider>
  );
}
