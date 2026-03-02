import { useContext } from "react";
import { ProductsContext } from "../store/ProductsContext";

export default function UseProductContext(){
  const context = useContext(ProductsContext);
  
    if (!context){
      throw new Error('useCart must be used within a CartProvider');
    }
  
    return context;
}