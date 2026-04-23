import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

export default function UseAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("There is problem with AuthContext.");
  }

  return context;
}
