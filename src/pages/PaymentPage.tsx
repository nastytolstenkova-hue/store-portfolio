import ShippingAddress from "../components/checkoutComp/ShippingAddress";
import PaymentMethodComp from "../components/checkoutComp/PaymentMethodComp";
import OrderSummPay from "../components/checkoutComp/OrderSummPay";
import { useState } from "react";

export default function PaymentPage() {
  const [isCardReady, setIsCardReady] = useState<boolean>(false);
  const [isUserReady, setIsUserReady] = useState<boolean>(false);

  const canOrder = isCardReady && isUserReady;

  return (
    <div className="grid grid-cols-2">
      <div className="">
        <ShippingAddress isShippingAdressValid={setIsUserReady}/>
        <PaymentMethodComp isCardValid={setIsCardReady}/>
      </div>
      <div>
        <OrderSummPay />
      </div>
    </div>
  );
}
