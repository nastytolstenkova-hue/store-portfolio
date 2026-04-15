import UseUserContext from "../../hooks/UseUserContext";

import Address from "../../components/Address";
import Button from "../../components/ui/Button";

export default function Addresses() {
  const { userAddresses } = UseUserContext();

  return (
    <div>
      <h3 className="text-xl m-2">My Addresses</h3>
      <Button text='Add New Address' className="flex my-5 ml-3 "/>
      <ul className="grid grid-cols-2 gap-2 mt-2">
        {userAddresses.map((address) => (
          <li key={address.id}>
            <Address address={address} />
          </li>
        ))}
      </ul>
    </div>
  );
}
