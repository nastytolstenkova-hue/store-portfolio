import { useState, useEffect, createContext, type ReactNode } from "react";

export interface UserInfo {
  id: number;
  userName: string;
  email: string;
  phone: string;
  birthDate: string;
  contactMethod: string;

}


export interface IUserContext {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const UserContext = createContext<IUserContext | undefined>(undefined)


export function UserContextProvider({children}:{children:ReactNode}){
  const [userInfo, setUserInfo] = useState<UserInfo>({id: 0,
  userName: "",
  email: "",
  phone: "",
  birthDate: "",
  contactMethod: "Email"});
  

 
  

  useEffect(()=> {
    fetch('/user-data.json') 
    .then(response => response.json())
    .then(data => setUserInfo(data))
    .catch(error => console.error('Loading user info error:', error));
  }, [])

  


  return(
    <UserContext.Provider value={{ userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  )
}

