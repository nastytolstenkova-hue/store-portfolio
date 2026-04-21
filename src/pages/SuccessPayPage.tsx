import mark from "../image/icons/mark.png";
import Button from "../components/ui/Button";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SuccessPayPage() {
  const location = useLocation();
  const state = location.state as { orderId: string } | null;
  const orderId = state?.orderId || "N/A";
  return (
    <div className="flex justify-center items-center mx-auto w-[90%] p-3 bg-amber-200/40 rounded-md border border-zinc-500/40">
      <div className="flex flex-col justify-center items-center">
        <img src={mark} alt="success" className="w-20 h-20 my-4 opacity-70" />
        <h3 className="text-2xl font-mono font-bold tracking-tight leading-tight">
          Thank you for your order!
        </h3>
        <p className="flex items-center justify-center text-sm mx-5 my-2">
          Your payment was successful and your order {orderId} is now being
          processed.
        </p>
        <Button text="Continue Shopping" />
        <NavLink
          to="/account/orders"
          className="underline text-sm text-zinc-600 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95"
        >
          Check your order
        </NavLink>
      </div>
    </div>
  );
}
