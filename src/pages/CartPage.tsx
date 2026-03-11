import UseProductContext from "../hooks/UseProductContext";
import OneCartProduct from "../components/OneCartProduct";
import OrderSummary from "../components/OrderSummary";

export default function CartPage(){
  const {cartProducts} = UseProductContext()
  return (
    <div className="mx-7 cursor-default hover:cursor-default">
      <h1 className="flex justify-center font-mono  text-3xl uppercase my-5">your shoping cart</h1>
      <div className="grid grid-cols-[2fr_1fr] gap-3 table-fixed">
        <div className="border border-zinc-600/40 rounded-xl shadow-md shadow-zinc-300 p-3 ">
          {cartProducts.map((product)=>
          <div key={product.id}>
            <OneCartProduct product={product}/>
            <div className="h-[1px] mx-1 my-2 bg-zinc-300"></div>
          </div>
          
          )}
        </div>
        <div className="border border-zinc-600/40 rounded-xl shadow-[0_0_10px_2px_rgba(255,180,0,0.5)] w-fit h-fit p-3">
          <OrderSummary/>
        </div>
      
      
    </div>
      
    </div>
    
  )
}