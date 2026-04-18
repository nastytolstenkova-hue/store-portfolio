import UseUserContext from "../../hooks/UseUserContext";
import { useState } from "react";

import Address from "../../components/Address";
import Button from "../../components/ui/Button";
import FormAddNewAddress from "../../components/FormAddNewAddress";

export default function Addresses() {
  const [isAddAddressForm, setIsAddAddressForm] = useState<boolean>(false);
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const { userAddresses } = UseUserContext();

 

  return (
    <div>
      <h3 className="text-xl m-2">My Addresses</h3>
      <Button
        text="Add New Address"
        className="flex my-5 ml-3 "
        onClick={() => setIsAddAddressForm(true)}
      />
      <ul className="grid grid-cols-2 gap-2 mt-2">
        {userAddresses.map((address) => (
          <li key={address.id}>
            <Address address={address} isEdit={setIsEditAddress} isForm={setIsAddAddressForm} />
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
