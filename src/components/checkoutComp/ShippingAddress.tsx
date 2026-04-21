import { useState, useEffect } from "react";

export interface IPayShippingAddressComp {
  setIsShippingAddressValid: (valid: boolean) => void;
  isShippingAddressValid: boolean;
  getUserInfo: (
    fullName: string,
    street: string,
    houseNumber: string,
    apartment: string,
    city: string,
    postalCode: string,
    shipMethod: string,
    isShippingAddressValid: boolean,
  ) => void;
}

const inputDes = "w-full border rounded-md px-2 bg-white mb-2";

export default function ShippingAddress({
  isShippingAddressValid,
  setIsShippingAddressValid,
  getUserInfo,
}: IPayShippingAddressComp) {
  const [fullName, setFullName] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [shipMethod, setShipMethod] = useState<string>("");

  const format = (str: string) =>
    str.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());

  useEffect(() => {
    const postCodeLenght = postalCode.trim().length;
    const isCodeValide = postCodeLenght >= 5 && postCodeLenght < 10;
    const isNameValide = fullName.trim().split(" ").length >= 2;
    const isMethodSelected = shipMethod !== "";
    const isOtherValid =
      street.length >= 1 && houseNumber.length >= 1 && city.length >= 2;

    if (isCodeValide && isNameValide && isOtherValid && isMethodSelected) {
      setIsShippingAddressValid(true);
      getUserInfo(
        format(fullName),
        format(street),
        houseNumber,
        apartment,
        format(city),
        postalCode,
        shipMethod,
        true,
      );
    } else {
      setIsShippingAddressValid(false);
    }
  }, [fullName, street, houseNumber, city, postalCode, shipMethod]);

  return (
    <div className="flex flex-col bg-amber-200/40 w-full p-3 rounded-md border border-zinc-500/40 mb-3">
      <h3 className="text-xl mb-5">Shipping Address</h3>
      <input
        className={`${inputDes}`}
        placeholder="Full Name"
        value={fullName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFullName(e.target.value)
        }
      />
      <p>Street Address</p>
      <input
        className={`${inputDes}`}
        placeholder="Street"
        value={street}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setStreet(e.target.value)
        }
      />
      <input
        className={`${inputDes}`}
        placeholder="House number"
        value={houseNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setHouseNumber(e.target.value)
        }
      />
      <input
        className={`${inputDes}`}
        placeholder="Apartment number"
        value={apartment}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setApartment(e.target.value)
        }
      />
      <input
        className={`${inputDes}`}
        placeholder="City"
        value={city}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCity(e.target.value)
        }
      />
      <input
        className={`${inputDes}`}
        placeholder="Postal code"
        value={postalCode}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPostalCode(e.target.value)
        }
      />
      <div className="flex flex-col ">
        <p>Shipping Method</p>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            name="shipping"
            value={shipMethod}
            onChange={() => setShipMethod("standard")}
          />
          <p className="text-sm whitespace-nowrap">
            Standard Delivery <span className="text-xs">Free, 5-7 days</span>
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="radio"
            name="shipping"
            value={shipMethod}
            onChange={() => setShipMethod("express")}
          />
          <p className="text-sm whitespace-nowrap">
            Express Delivery <span className="text-xs">$25, 2-3 days</span>
          </p>
        </div>
        {!isShippingAddressValid && fullName.length > 0 && (
          <p className="text-red-500 text-xs">
            Please fill out all fields correctly!
          </p>
        )}
      </div>
    </div>
  );
}
