import { useState, useEffect, createContext, type ReactNode } from "react";



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
  userAddresses: IUserAddress[];
  setUserAddresses: React.Dispatch<React.SetStateAction<IUserAddress[]>>;
  handleDeleteAddress: (id: string) => void;
  selectedEditAddress: IUserAddress | undefined;
  setSelectedEditAddress: React.Dispatch<
    React.SetStateAction<IUserAddress | undefined>
  >;
  
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  
  
  const [userAddresses, setUserAddresses] = useState<IUserAddress[]>(() => {
    try {
      const saved = localStorage.getItem("userAddresses");
      return saved ? (JSON.parse(saved) as IUserAddress[]) : [];
    } catch (error) {
      console.error("Error addresses parsing:", error);
      return [];
    }
  });

 

  const [selectedEditAddress, setSelectedEditAddress] = useState<
    IUserAddress | undefined
  >();

  useEffect(() => {
    localStorage.setItem("userAddresses", JSON.stringify(userAddresses));
  }, [userAddresses]);


  const handleDeleteAddress = (id: string) => {
    setUserAddresses((prevVal) =>
      prevVal.filter((address) => address.id !== id),
    );
  };

  return (
    <UserContext.Provider
      value={{
        userAddresses,
        setUserAddresses,
        handleDeleteAddress,
        selectedEditAddress,
        setSelectedEditAddress,
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
