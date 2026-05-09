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
      
        <h2 className="text-3xl uppercase font-mono flex justify-center bg-amber-300/30  p-2 rounded-2xl border border-amber-500/30 shadow-sm shadow-amber-800/50 mb-2">
          My Addresses
        </h2>
        <Button
          text="Add New Address"
          className="flex my-5 ml-3 "
          onClick={() => setIsAddAddressForm(true)}
        />
        <ul className="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2
        lg:grid-cols-3">
          {userAddresses.map((address) => (
            <li key={address.id} >
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
