import UseProductContext from "../../hooks/UseProductContext";
import OneItemSummary from "./OneItemSummary";
import { NavLink } from "react-router-dom";

export default function OrderSummPay() {
  const { cartProducts, summProd, totalPrice } = UseProductContext();
  return (
    <div className="flex flex-col bg-amber-200/40 w-fit p-3 rounded-md border border-zinc-500/40 ml-3">
      <h3 className="text-xl mb-1">Order summary</h3>
      <ul>
        {cartProducts.map((prod) => (
          <li key={prod.id}>
            <OneItemSummary product={prod} />
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <p>Subtotal</p>
        <p>${totalPrice}</p>
      </div>
      <div className="flex justify-between items-center">
        <p>Shipping</p>
        <p>Free</p>
      </div>
      <div className="border-b border-zinc-500 m-2 "></div>
      <div className="flex justify-between items-center font-bold text-xl">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
      <button className="flex justify-center items-center mx-auto my-2 p-1 uppercase bg-zinc-300/30  shadow-[0_0_25px_5px_rgba(255,180,0,0.4)]  rounded-xl w-4/5 cursor-pointer whitespace-nowrap hover:bg-amber-400/50 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] hover:text-white   duration-300 active:scale-95 transition-all ">
        pay
      </button>
      <NavLink
        to="/catalog"
        className="flex justify-center underline text-sm text-zinc-600 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95"
      >
        continue shopping
      </NavLink>
    </div>
  );
}
