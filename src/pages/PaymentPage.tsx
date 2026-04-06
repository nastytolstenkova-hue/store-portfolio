import ShippingAddress from "../components/checkoutComp/ShippingAddress";
import PaymentMethodComp from "../components/checkoutComp/PaymentMethodComp";
import OrderSummPay from "../components/checkoutComp/OrderSummPay";

export default function PaymentPage() {
  return (
    <div className="grid grid-cols-2">
      <div className="">
        <ShippingAddress />
        <PaymentMethodComp />
      </div>
      <div>
        <OrderSummPay />
      </div>
    </div>
  );
}
