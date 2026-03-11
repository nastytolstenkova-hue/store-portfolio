import UseProductContext from "../hooks/UseProductContext";

import type { IProduct } from "../store/ProductsContext";

import { Link } from "react-router-dom";




export default function OneProduct({product}:{product:IProduct}){
  const {addCartProduct} = UseProductContext()

  return (
    <div className="flex flex-col border border-zinc-200 rounded-md">
      <div className="w-full aspect-3/4 overflow-hidden p-2">
        <Link to={`/catalog/${product.id}`}>
          <img src={product.image} alt={product.name} className="w-full h-full  rounded-md object-cover transition-transform duration-500 hover:scale-105"/>
        </Link>
        
      </div>
      
      <div className="flex justify-center items-center min-h-[3.5rem] px-2 text-center">
        
        <Link 
        to={`/catalog/${product.id}`} 
        className="block uppercase text-base font-mono  mx-auto max-w-[90%] tracking-tight line-clamp-2 leading-tight mt-3  hover:underline cursor-pointer"
      >
        {product.name}
      </Link>

      </div>
      
      
      <p className="text-zinc-600 line-clamp-2 ">{product.description}</p>
      

      
      <div className="flex justify-between mx-4 my-3">
        <p>price:</p>
        <p>{product.price}</p>
      </div>
      
      <button className="flex justify-center items-center mx-auto mb-2 p-1 uppercase bg-zinc-300/30  shadow-[0_0_25px_5px_rgba(255,180,0,0.4)]  rounded-xl w-4/5 cursor-pointer whitespace-nowrap hover:bg-amber-400/50 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] hover:text-white   duration-300 active:scale-95 transition-all " onClick={()=>{addCartProduct(product.id)}}>add to cart</button>
    </div>
  )
}