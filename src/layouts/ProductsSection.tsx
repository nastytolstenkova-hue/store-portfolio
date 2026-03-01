import { useContext } from "react";
import { ProductsContext } from "../store/ProductsContext";
import OneProduct from "../components/OneProduct";

export default function ProductsSection(){
  const context = useContext(ProductsContext);

  if (!context){
    throw new Error('useCart must be used within a CartProvider');
  }

  const {productsList} = context;

  return (
    <div className="m-5 ">
      <ul className="grid grid-cols-4 gap-2">
        {productsList.map((product)=>
        <li key={product.id}><OneProduct product={product}/></li>
        )}
      </ul>
    </div>
  )
}