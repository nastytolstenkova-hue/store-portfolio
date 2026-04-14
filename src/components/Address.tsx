import type { IUserAddress } from "../store/UserContext"

export default function Address({address}:{address:IUserAddress}){
  return (
    <div>
      <p>{address.fullName}</p>
      <div className="flex">
        <p>{address.street} ,</p>
        <p>{address.houseNumber}</p>
      </div>
      <div className="flex">
        <p>Appartment:</p>
        <p>{address.apartment}</p>
      </div>
      <div>
        <p>{address.city} ,</p>
        <p>{address.postalCode}</p>
      </div>
      <div className="flex">
        <button>Edit</button>
        <button>Delete</button>
      </div>
      
    </div>
  )
}