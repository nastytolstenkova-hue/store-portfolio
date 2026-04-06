import UseCartContext from "../../hooks/UseCartContext";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";

export default function OrderSummary() {
  const { totalPrice, summProd } = UseCartContext();
  return (
    <div className="flex flex-col cursor-default hover:cursor-default">
      <h2 className="flex justify-center uppercase mb-2">order summary</h2>
      <div className="flex justify-between mb-1">
        <p>Subtotal ({summProd}):</p>
        <p>${totalPrice}</p>
      </div>
      <div className="flex justify-between mb-1">
        <p>Shiping:</p>
        <p>$ 10</p>
      </div>
      <div className="h-px mx-1 my-2 bg-zinc-300"></div>
      <div className="flex justify-between mb-1 text-xl">
        <p>Total:</p>
        <p>${totalPrice + 10}</p>
      </div>
      <NavLink to='/payment' className='flex justify-center items-center mx-auto my-2 p-1 uppercase bg-zinc-300/30  shadow-[0_0_25px_5px_rgba(255,180,0,0.4)]  rounded-xl cursor-pointer whitespace-nowrap hover:bg-amber-400/50 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] hover:text-white   duration-300 active:scale-95 transition-all '>Proceed to checkout</NavLink>
      <NavLink
        to="/catalog"
        className="flex justify-center underline text-sm text-zinc-600 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95"
      >
        continue shopping
      </NavLink>
    </div>
  );
}
