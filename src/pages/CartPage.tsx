import { NavLink } from "react-router-dom";

import UseCartContext from "../hooks/UseCartContext";
import OneCartProduct from "../components/cartComponents/OneCartProduct";
import OrderSummary from "../components/cartComponents/OrderSummary";

export default function CartPage() {
  const { cartProducts, summProd } = UseCartContext();
  return (
    <div className="mx-7 cursor-default hover:cursor-default mt-4">
      {summProd === 0 ? (
        <div className="flex flex-col justify-center items-center mx-auto w-[90%] sm:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] p-3 bg-amber-200/40 rounded-md border border-zinc-500/40">
          <p>Your cart is empty.</p>
          <NavLink
            to="/catalog"
            className="flex justify-center items-center mx-auto my-2 p-1 uppercase bg-zinc-300/30  shadow-[0_0_25px_5px_rgba(255,180,0,0.4)]  rounded-xl cursor-pointer whitespace-nowrap hover:bg-amber-400/50 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] hover:text-white   duration-300 active:scale-95 transition-all "
          >
            find your products here
          </NavLink>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl uppercase font-mono flex justify-center bg-amber-300/30  p-2 rounded-2xl border border-amber-500/30 shadow-sm shadow-amber-800/50 mb-2 w-[70%] mx-auto">
            your shopping cart
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr] xl:grid-cols-[1fr_1fr] gap-3 table-fixed">
            <div
              className="flex flex-col justify-center items-center border border-zinc-600/40 mx-auto rounded-xl shadow-md shadow-zinc-300 p-3 w-[90%] 
            sm:w-[80%] sm:mr-0  
            lg:w-[60%] 
            xl:w-[80%] xl:text-lg 
            2xl:w-[80%] "
            >
              {cartProducts.map((product) => (
                <div key={product.id}>
                  <OneCartProduct product={product} />
                  <div className="h-px mx-1 my-2 bg-zinc-300"></div>
                </div>
              ))}
            </div>
            <div className="flex flex-col mx-auto border border-zinc-600/40 rounded-xl shadow-[0_0_10px_2px_rgba(255,180,0,0.5)] w-[90%] h-fit p-5
            sm:w-fit sm:ml-0 
            lg:w-[80%]  
            xl:w-[50%] xl:text-lg 
            2xl:w-[70%] 
             ">
              <OrderSummary />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
