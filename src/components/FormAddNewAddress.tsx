import { useState, useEffect } from "react";
import UseUserContext from "../hooks/UseUserContext";
import Button from "./ui/Button";

const inputDes = "w-full border rounded-md px-2 bg-white mb-2";

export default function FormAddNewAddress() {
  const [fullName, setFullName] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [isMain, setIsMain] = useState<boolean>(false);

  const { setUserAddresses } = UseUserContext();

  const format = (str: string) =>
    str.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());

  const handleAddNewAddress = () => {
    const postCodeLenght = postalCode.trim().length;
    const isCodeValide = postCodeLenght >= 5 && postCodeLenght < 10;
    const isNameValide = fullName.trim().split(" ").length >= 2;
    const isOtherValid =
      street.length >= 1 && houseNumber.length >= 1 && city.length >= 2;

    if (isCodeValide && isNameValide && isOtherValid) {
      const newAddress = {
        id: `${street} ${houseNumber} ${Date.now()}`,
        fullName: format(fullName),
        street: format(street),
        houseNumber: houseNumber,
        apartment: apartment,
        city: format(city),
        postalCode: postalCode,
        shipMethod: "",
        mainAddress: isMain,
      };

      setUserAddresses((prevVal) => {
        if (prevVal.length === 0){
          newAddress.mainAddress = true
          return [newAddress];
        }
        if (isMain) {
          const resetPrevious = prevVal.map((addr) => ({
            ...addr,
            mainAddress: false,
          }));
          return [newAddress, ...resetPrevious];
        }
        return [newAddress, ...prevVal];
      });
      setFullName("");
      setStreet("");
      setHouseNumber("");
      setApartment("");
      setIsMain(false);
      setPostalCode("");
      setCity("");
    }
  };

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
      <div className="flex items-center gap-2">
        <label>Choose as main</label>
        <input
          type="checkbox"
          checked={isMain}
          onChange={() => setIsMain(!isMain)}
          className="cursor-pointer accent-amber-500"
        />
      </div>
      <Button text="Add new address" onClick={handleAddNewAddress} />
    </div>
  );
}
