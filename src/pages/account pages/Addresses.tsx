import UseUserContext from "../../hooks/UseUserContext";
import { useState } from "react";
import LoginForm from "../../components/loginComponents/LoginForm";
import RegistrationForm from "../../components/loginComponents/RegistrationForm";

import Address from "../../components/Address";
import Button from "../../components/ui/Button";
import FormAddNewAddress from "../../components/FormAddNewAddress";

import UseAuthContext from "../../hooks/UseAuthContext";

export default function Addresses() {
  const [isAddAddressForm, setIsAddAddressForm] = useState<boolean>(false);
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const { userAddresses } = UseUserContext();

  const { currentUser, setFormLogIn, formLogIn, formSignUp } = UseAuthContext();

  return (
    <div className="bg-amber-100/40 h-full rounded-md">
      {formLogIn && <LoginForm/>}
      {formSignUp && <RegistrationForm/>}
      {currentUser ? (
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
      ) : (
        <div className="m-3 flex flex-col">
          <p className="flex justify-center m-5">Log in or sign up to see the information</p>
          <Button text='Login' onClick={()=>setFormLogIn(true)}/></div>
      )}
    </div>
  );
}
