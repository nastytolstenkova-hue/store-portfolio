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
  id: string;
  fullName: string;
  street: string;
  houseNumber: string;
  apartment: string;
  city: string;
  postalCode: string;
  shipMethod: string;
  mainAddress: boolean;
}

export interface IUserContext {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  userAddresses: IUserAddress[];
  setUserAddresses: React.Dispatch<React.SetStateAction<IUserAddress[]>>;
  handleDeleteAddress: (id:string) => void;
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
  const [userAddresses, setUserAddresses] = useState<IUserAddress[]>(() => {
    try {
      const saved = localStorage.getItem("userAddresses");
      return saved ? (JSON.parse(saved) as IUserAddress[]) : [];
    } catch (error) {
      console.error("Error adresses parsing:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("userAddresses", JSON.stringify(userAddresses));
  }, [userAddresses]);

  useEffect(() => {
    fetch("/user-data.json")
      .then((response) => response.json())
      .then((data) => setUserInfo(data))
      .catch((error) => console.error("Loading user info error:", error));
  }, []);

  const handleDeleteAddress = (id: string) => {
    setUserAddresses((prevVal) =>
      prevVal.filter((address) => address.id !== id),
    );
  };

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, userAddresses, setUserAddresses, handleDeleteAddress }}
    >
      {children}
    </UserContext.Provider>
  );
}
