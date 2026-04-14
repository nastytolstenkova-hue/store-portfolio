import ShippingAddress from "../components/checkoutComp/ShippingAddress";
import PaymentMethodComp from "../components/checkoutComp/PaymentMethodComp";
import type { IUserAddress } from "../store/UserContext";
import OrderSummPay from "../components/checkoutComp/OrderSummPay";
import { useState } from "react";
import UseUserContext from "../hooks/UseUserContext";
import UseCartContext from "../hooks/UseCartContext";
import UseOrderContext from "../hooks/UseOrderContext";
import type { IOrder } from "../store/OrderContext";
import { useNavigate } from "react-router-dom";


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

  const navigate = useNavigate();

  const { setUserAddresses } = UseUserContext();
  const { setCartProducts, cartProducts, totalPrice } = UseCartContext();
  const { sendOrder, setUserOrders } = UseOrderContext();

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

      const orderId = `NL-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`

      const newOrder: IOrder = {
        id: orderId,
        date: new Date().toISOString().split("T")[0],
        status: "Processing",
        totalPrice: totalPrice,
        items: cartProducts.map((prod) => ({
          id: prod.id,
          name: prod.name,
          image: prod.image,
          price: prod.price,
          quantity: prod.count,
        })),
      };

      sendOrder(newOrder);
      setUserOrders((prevVal)=>[ newOrder, ...prevVal])
      setCartProducts([]);
      setIsCardReady(false);
      setIsUserReady(false);
      navigate('/success', {state: {orderId : orderId}})
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
        <OrderSummPay payFunction={handlePayFunction} />
      </div>
    </div>
  );
}
