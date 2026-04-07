import { useState, useEffect } from "react";

export interface IPayShippingAddressComp {
  isShippingAdressValid: (valid: boolean) => void;
}

export default function ShippingAddress({
  isShippingAdressValid,
}: IPayShippingAddressComp) {
  const [fullName, setFullName] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");

  const inputDes = "w-full border rounded-md px-2 bg-white mb-2";

  useEffect(() => {
    const postCodeLenght = postalCode.trim().split(" ").length;
    const isCodeValide = postCodeLenght >= 5 && postCodeLenght < 10;

    const isNameValide = fullName.trim().split(" ").length >= 2;

    const isOtherValid =
      street.length > 1 &&
      houseNumber.length > 1 &&
      city.length > 2;

    if (isCodeValide && isNameValide && isOtherValid) {
      isShippingAdressValid(true);
    } else {
      isShippingAdressValid(false);
    }
  }, [fullName, street, houseNumber, city, postalCode]);

  return (
    <div className="flex flex-col bg-amber-200/40 w-full p-3 rounded-md border border-zinc-500/40 mb-3">
      <h3 className="text-xl mb-5">Shipping Address</h3>
      <input
        className={`${inputDes}`}
        placeholder="Full Name"
        value={fullName}
      />
      <p>Street Address</p>
      <input className={`${inputDes}`} placeholder="Street" />
      <input className={`${inputDes}`} placeholder="House number" />
      <input className={`${inputDes}`} placeholder="Apartment number" />
      <input className={`${inputDes}`} placeholder="City" />
      <input className={`${inputDes}`} placeholder="Postal code" />
      <div className="flex flex-col ">
        <p>Shipping Method</p>
        <div className="flex gap-2 items-center">
          <input type="radio" name="shipping" />
          <p className="text-sm whitespace-nowrap">
            Standard Delivery <span className="text-xs">Free, 5-7 days</span>
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <input type="radio" name="shipping" />
          <p className="text-sm whitespace-nowrap">
            Express Delivery <span className="text-xs">$25, 2-3 days</span>
          </p>
        </div>
      </div>
    </div>
  );
}
