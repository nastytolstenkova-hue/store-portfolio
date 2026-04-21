import { NavLink } from "react-router-dom";

import UseCartContext from "../hooks/UseCartContext";
import OneCartProduct from "../components/cartComponents/OneCartProduct";
import OrderSummary from "../components/cartComponents/OrderSummary";

export default function CartPage() {
  const { cartProducts, summProd } = UseCartContext();
  return (
    <div className="mx-7 cursor-default hover:cursor-default mt-4">
      {summProd === 0 ? (
        <div className="flex flex-col justify-center items-center mx-auto w-[90%] p-3 bg-amber-200/40 rounded-md border border-zinc-500/40">
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
          <h1 className="flex justify-center font-mono  text-3xl uppercase my-5">
            your shopping cart
          </h1>
          <div className="grid grid-cols-[2fr_1fr] gap-3 table-fixed">
            <div className="border border-zinc-600/40 rounded-xl shadow-md shadow-zinc-300 p-3 ">
              {cartProducts.map((product) => (
                <div key={product.id}>
                  <OneCartProduct product={product} />
                  <div className="h-px mx-1 my-2 bg-zinc-300"></div>
                </div>
              ))}
            </div>
            <div className="border border-zinc-600/40 rounded-xl shadow-[0_0_10px_2px_rgba(255,180,0,0.5)] w-fit h-fit p-3">
              <OrderSummary />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
