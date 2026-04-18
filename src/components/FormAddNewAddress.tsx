import { useState, useEffect } from "react";
import UseUserContext from "../hooks/UseUserContext";
import Button from "./ui/Button";

const inputDes = "w-full border rounded-md px-2 bg-white mb-2";

export interface IFormAddAddress {
  isForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit: boolean;
}

export default function FormAddNewAddress({
  isForm,
  setIsEdit,
  isEdit,
}: IFormAddAddress) {
  const [fullName, setFullName] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [isMain, setIsMain] = useState<boolean>(false);
  const [emptyFields, setEmptyFields] = useState<boolean>(false);

  const { setUserAddresses, selectedEditAddress } = UseUserContext();

  const format = (str: string) =>
    str.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());

  const handleAddNewAddress = () => {
    const postCodeLenght = postalCode.trim().length;
    const isCodeValide = postCodeLenght >= 5 && postCodeLenght < 10;
    const isNameValide = fullName.trim().split(" ").length >= 2;
    const isOtherValid =
      street.length >= 1 && houseNumber.length >= 1 && city.length >= 2;

    if (isCodeValide && isNameValide && isOtherValid) {
      // СОЗДАЕМ ОБЪЕКТ С ДАННЫМИ
      const newAddress = {
        // ДОБАВЛЕНО: Если мы редактируем, оставляем старый ID. Если нет - создаем новый.
        id:
          isEdit && selectedEditAddress
            ? selectedEditAddress.id
            : `${street} ${houseNumber} ${Date.now()}`,
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
        if (isEdit) {
          let updatedList = prevVal.map((addr) =>
            addr.id === newAddress.id ? newAddress : addr,
          );

          if (isMain) {
            updatedList = updatedList.map((addr) => ({
              ...addr,
              mainAddress: addr.id === newAddress.id,
            }));
          }
          return updatedList;
        }

        if (prevVal.length === 0) {
          newAddress.mainAddress = true;
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

      closeFunction();
    } else {
      setEmptyFields(true);
    }
  };

  const closeFunction = () => {
    setFullName("");
    setStreet("");
    setHouseNumber("");
    setApartment("");
    setIsMain(false);
    setPostalCode("");
    setCity("");
    isForm(false);
    setIsEdit(false);
    setEmptyFields(false);
  };

  useEffect(() => {
    if (isEdit && selectedEditAddress) {
      setFullName(selectedEditAddress.fullName);
      setStreet(selectedEditAddress.street);
      setHouseNumber(selectedEditAddress.houseNumber);
      setApartment(selectedEditAddress.apartment);
      setIsMain(selectedEditAddress.mainAddress);
      setPostalCode(selectedEditAddress.postalCode);
      setCity(selectedEditAddress.city);
      isForm(true);
    }
  }, [isEdit, selectedEditAddress]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col bg-amber-200/40 p-3 rounded-md border border-zinc-500/40 mb-3 relative  mx-3  dark:bg-zinc-800  shadow-amber-400/70  w-[60%]">
        <h3 className="text-xl mb-5">Shipping Address</h3>
        <button
          type="button"
          className="text-amber-200 rounded-xs w-6 h-6 ml-7.5 absolute top-2 right-4  active:cursor-pointer hover:cursor-pointer hover:text-amber-300"
          onClick={closeFunction}
        >
          ✕
        </button>
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
        {emptyFields && (
          <p className="text-xs text-red-800">
            Please fill in all required fields!
          </p>
        )}
        <Button text={isEdit ? 'Save' :"Add new address"} onClick={handleAddNewAddress} />
      </div>
    </div>
  );
}
