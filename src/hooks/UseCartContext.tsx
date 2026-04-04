import { useContext } from "react";
import { CartContext } from "../store/CartContext";


export default function UseCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("There is problem with CartContext.");
  }

  return context;
}
