import UseUserContext from "../../hooks/UseUserContext";
import { useState } from "react";
import { Link } from "react-router-dom";

import Address from "../../components/Address";
import Button from "../../components/ui/Button";
import FormAddNewAddress from "../../components/FormAddNewAddress";

export default function Addresses() {
  const [isAddAddressForm, setIsAddAddressForm] = useState<boolean>(false);
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const { userAddresses } = UseUserContext();

  return (
    <div>
      {userAddresses.length === 0 ? (
        <div className="flex my-5 flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-zinc-800 font-mono font-bold text-3xl uppercase tracking-[0.2em] mb-4">
            Your Addresses List is empty
          </h1>
        </div>
      ) : (
        <h2 className="text-3xl uppercase font-mono flex justify-center bg-amber-300/30  p-2 rounded-2xl border border-amber-500/30 shadow-sm shadow-amber-800/50 mb-2">
          My Addresses
        </h2>
      )}
      <Button
        text="Add New Address"
        className="flex my-5 ml-3 "
        onClick={() => setIsAddAddressForm(true)}
      />
      <ul
        className="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2
        lg:grid-cols-3"
      >
        {userAddresses.map((address) => (
          <li key={address.id}>
            <Address
              address={address}
              isEdit={setIsEditAddress}
              isForm={setIsAddAddressForm}
            />
          </li>
        ))}
      </ul>
      {isAddAddressForm && (
        <FormAddNewAddress
          isForm={setIsAddAddressForm}
          setIsEdit={setIsEditAddress}
          isEdit={isEditAddress}
        />
      )}
    </div>
  );
}
