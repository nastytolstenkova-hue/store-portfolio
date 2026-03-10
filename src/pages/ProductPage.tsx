import { useParams } from "react-router-dom";
import type { IProduct  } from "../store/ProductsContext";


import UseProductContext from "../hooks/UseProductContext";


export default function ProductPage(){
  const { id } = useParams<{ id: string }>();
  const {plusProduct, minusProduct, addCartProduct, productsList} = UseProductContext();

  const product: IProduct | undefined = productsList.find((prod)=>
  prod.id === Number(id))

  if (!product){
    return <div>Product isn't exist</div>
  }

  const buttonDes = `flex justify-center items-center  p-1 w-7 h-7 bg-zinc-400/30 cursor-pointer `
  const activeBatton = ' hover:bg-zinc-500/40  transition-colors duration-300 active:scale-95'

  return (
    <div className="grid grid-cols-[2fr_3fr] gap-5 mt-5 ml-5 font-sans cursor-default">
      <div ><img src={product.image} alt={product.name} className="rounded-xl "/></div>
      <div>
        <p className="bg-yellow-300/20 w-fit px-2 uppercase rounded-full text-base">{product.category} lights</p>
        <h1 className="uppercase text-3xl my-3 tracking-wide line-clamp-2 w-4/5">{product.name}</h1>
        <h2 className="text-2xl">${product.price}</h2>
        <div className="my-5">
          <p className="uppercase tracking-wide">{product.inStock ? <div><span className="font-bold">✓ </span>in stock</div> : 'not available'}</p>
          <p><span className="font-medium text-base">Material: </span>{product.material}</p>
        </div>
        <p className="mr-1">{product.description}</p>
      
        <div className="grid grid-cols-[1fr_2fr] ml-5 my-5">
          <div className="flex border border-zinc-300 w-fit h-fit rounded-md ">
            <button className={`${activeBatton} ${buttonDes}`} onClick={()=>minusProduct(product.id)}>-</button>
            
            <p className="flex justify-center items-center p-1 w-7 h-7">1</p>
            <button className={`${activeBatton} ${buttonDes}`} onClick={()=>plusProduct(product.id)}>+</button>
            
          </div>
          <div>
            <button className="flex justify-center items-center mx-auto p-1 uppercase   bg-yellow-300/30   rounded-xl w-4/5 cursor-pointer  shadow-[0_0_10px_2px_rgba(255,180,0,0.5)] whitespace-nowrap hover:bg-yellow-300/50 hover:border-white transition-colors duration-300 active:scale-95 " onClick={()=>{addCartProduct(product.id)}}>add to cart</button>
          </div>
        </div>
        <button className="cursor-pointer  active:scale-95">🤍 <span className="underline text-base text-zinc-600 hover:text-black  transition-colors duration-300 ">add to wishlist</span></button>
      
        

      </div>
      
    </div>

  )
}