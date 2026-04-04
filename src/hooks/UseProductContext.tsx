import { useContext } from "react";
import { ProductsContext } from "../store/ProductsContext";


export default function UseProductContext() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("There is problem with ProductContext.");
  }

  return context;
}
