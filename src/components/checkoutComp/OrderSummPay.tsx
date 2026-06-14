import UseCartContext from "../../hooks/UseCartContext";
import OneItemSummary from "./OneItemSummary";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";

export interface IOrderSummPay {
  payFunction: () => void;
  submitError: string | null;
  isSubmitting: boolean;
}

export default function OrderSummPay({
  payFunction,
  isSubmitting,
  submitError,
}: IOrderSummPay) {
  const { cartProducts, totalPrice } = UseCartContext();
  return (
    <div className="flex flex-col bg-amber-200/40 w-full p-3 rounded-md border border-zinc-500/40">
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
      {submitError && (
        <p className="text-red-500 text-sm mb-2">{submitError}</p>
      )}
      <Button
        text={isSubmitting ? "Processing..." : "Pay"}
        className="w-4/5"
        type="button"
        onClick={payFunction}
        disabled={isSubmitting}
      />
      <NavLink
        to="/catalog"
        className="flex justify-center underline text-sm text-zinc-600 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95"
      >
        continue shopping
      </NavLink>
    </div>
  );
}
