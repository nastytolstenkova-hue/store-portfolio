import UseProductContext from "../hooks/UseProductContext";
import OneCartProduct from "../components/OneCartProduct";
import OrderSummary from "../components/OrderSummary";

export default function CartPage(){
  const {cartProducts} = UseProductContext()
  return (
    <div className="grid grid-cols-2">
      <div>
        {cartProducts.map((product)=>
        <OneCartProduct product={product}/>
        )}
      </div>
      <div>
        <OrderSummary/>
      </div>
      
      
    </div>
  )
}