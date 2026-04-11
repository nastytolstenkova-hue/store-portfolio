import ShippingAddress from "../components/checkoutComp/ShippingAddress";
import PaymentMethodComp from "../components/checkoutComp/PaymentMethodComp";
import type { IUserAddress } from "../store/UserContext";
import OrderSummPay from "../components/checkoutComp/OrderSummPay";
import { useState } from "react";
import UseUserContext from "../hooks/UseUserContext";

export default function PaymentPage() {
  const [isCardReady, setIsCardReady] = useState<boolean>(false);
  const [isUserReady, setIsUserReady] = useState<boolean>(false);
  const [address, setAdress] = useState<IUserAddress>({
    fullName: "",
    street: "",
    houseNumber: "",
    apartment: "",
    city: "",
    postalCode: "",
    shipMethod: "",
  });

  const { setUserAddresses } = UseUserContext();

  const canOrder = isCardReady && isUserReady;

  const getInfo = (
    fullName: string,
    street: string,
    houseNumber: string,
    apartment: string,
    city: string,
    postalCode: string,
    shipMethod: string,
    isShippingAdressValid: boolean,
  ) => {
    if (isShippingAdressValid) {
      setAdress({
        fullName: fullName,
        street: street,
        houseNumber: houseNumber,
        apartment: apartment,
        city: city,
        postalCode: postalCode,
        shipMethod: shipMethod,
      });
    }
  };

  const handlePayFunction = () => {
    if (canOrder) {
      setUserAddresses((prevVal) => [...prevVal, address]);
      setAdress({
        fullName: "",
        street: "",
        houseNumber: "",
        apartment: "",
        city: "",
        postalCode: "",
        shipMethod: "",
      });
      setIsCardReady(false);
      setIsUserReady(false);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="">
        <ShippingAddress
          setIsShippingAdressValid={setIsUserReady}
          isShippingAdressValid={isUserReady}
          getUserInfo={getInfo}
        />
        <PaymentMethodComp isCardValid={setIsCardReady} />
      </div>
      <div>
        <OrderSummPay payFunction={handlePayFunction}/>
      </div>
    </div>
  );
}
