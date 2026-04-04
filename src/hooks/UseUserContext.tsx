import { useContext } from "react";
import { UserContext } from "../store/UserContext";


export default function UseUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("There is problem with UserContext.");
  }

  return context;
}
