import UseUserContext from "../../hooks/UseUserContext";

import Address from "../../components/Address";

export default function Addresses() {
  const { userAddresses } = UseUserContext();

  return (<div>
    {userAddresses.map((address)=><Address address={address}/>)}
  </div>);
}
