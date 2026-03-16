import type { IProduct } from "../store/ProductsContext";
import UseProductContext from "../hooks/UseProductContext";
import { Link } from "react-router-dom";

export default function OneWishListProd({product}:{product:IProduct}){
  const {addCartProduct} = UseProductContext();
  
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
            <button className="flex justify-center items-center mx-auto mb-2 p-1 uppercase bg-zinc-300/30  shadow-[0_0_25px_5px_rgba(255,180,0,0.4)]  rounded-xl w-4/5 cursor-pointer whitespace-nowrap hover:bg-amber-400/50 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] hover:text-white   duration-300 active:scale-95 transition-all " onClick={()=>addCartProduct(product.id)}>Add to cart</button>
          </div>
            
         
          
        </div>
        <div className="flex justify-between mx-2 ">
          <p>${product.price}</p>
          <button className="underline text-base text-zinc-600 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95">Remove from wishlist</button>
        </div>
      </div>
    </div>
  )
}