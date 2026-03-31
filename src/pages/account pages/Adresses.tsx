import ShippingAddress from "../../components/checkoutComp/ShippingAddress";
import PaymentMethodComp from "../../components/checkoutComp/PaymentMethodComp";

export default function Adresses(){
  return (
    <div className="grid grid-cols-2">
      <div className="">
        <ShippingAddress/>
        <PaymentMethodComp/>

      </div>
      <div></div>
      
    </div>
  )
}