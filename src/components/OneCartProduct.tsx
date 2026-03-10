import type { ICartProduct } from "../store/ProductsContext";
import UseProductContext from "../hooks/UseProductContext";
import { Link } from "react-router-dom";

export default function OneCartProduct({product}:{product:ICartProduct}){
  const {plusProduct, minusProduct, removeProduct} = UseProductContext();
  const buttonDes = `flex justify-center items-center  p-1 w-7 h-7 bg-zinc-400/40 cursor-pointer `
  const activeBatton = ' hover:bg-zinc-500/40  transition-colors duration-300 active:scale-95'
  return (
    <div className="grid grid-cols-[1fr_2fr]">
      <div className="w-30 aspect-4/5 overflow-hidden ">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md bg-zinc-100"/>
      </div>
      <div >
        
        <Link 
        to={`/catalog/${product.id}`} 
        className="mt-3 mx-2 text-lg tracking-tight whitespace-nowrap hover:underline cursor-pointer"
      >
        {product.name}
      </Link>
        <p className="mx-2">{product.material}</p>
        <div className="flex justify-between mx-2 mt-3 text-base ">
          <p>Price:</p>
          
          <div className="flex border border-zinc-500 w-fit h-fit rounded-md">
            <button className={`${activeBatton} ${buttonDes}`} onClick={()=>minusProduct(product.id)}>-</button>
          
            <p className="flex justify-center items-center p-1 w-7 h-7">{product.count}</p>
            <button className={`${activeBatton} ${buttonDes}`} onClick={()=>plusProduct(product.id)}>+</button>
          </div>
            
         
          
        </div>
        <div className="flex justify-between mx-2 ">
          <p>${product.price}</p>
          <button className="underline text-base text-zinc-600 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95" onClick={()=>removeProduct(product.id)}>Remove</button>
        </div>
      </div>
    </div>
  )
}