import type { IUserAddress } from "../store/UserContext";
import UseUserContext from "../hooks/UseUserContext";

export interface IAddress {
  address: IUserAddress;
  isEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Address({ address, isEdit, isForm }: IAddress) {
  const { handleDeleteAddress, setUserAddresses, setSelectedEditAddress } =
    UseUserContext();
  const setMainAddress = (addressId: string) => {
    setUserAddresses((prevAddresses) =>
      prevAddresses.map((addr) => ({
        ...addr,
        mainAddress: addr.id === addressId,
      })),
    );
  };

  return (
    <div className="flex flex-col p-2 bg-amber-200/50 rounded-md gap-1 border border-amber-300 shadow-md">
      <div className="flex gap-2 justify-end ">
        <p className="text-xs font-mono">
          {address.mainAddress ? "main address" : "change main address"}
        </p>
        <input
          type="radio"
          name="mainAddress"
          checked={address.mainAddress}
          onChange={() => setMainAddress(address.id)}
          className="cursor-pointer accent-amber-500"
        />
      </div>
      <div className="flex">
        <p>{address.street},</p>
        <p className="ml-2">{address.houseNumber}</p>
      </div>
      <div className="flex gap-2">
        <p>Appartment:</p>
        <p>{address.apartment}</p>
      </div>
      <div className="flex gap-2">
        <p>{address.city},</p>
        <p>{address.postalCode}</p>
      </div>
      <div className="border-b-2 border-amber-400/50"></div>
      <div className="flex justify-between items-center">
        <button className="flex justify-center underline text-zinc-800 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95" onClick={()=>{isEdit(true); setSelectedEditAddress(address); isForm(true)} }>
          Edit
        </button>
        <button
          className="flex justify-center text-red-600/70 cursor-pointer hover:text-red-600/90  transition-colors duration-300 active:scale-95"
          onClick={() => handleDeleteAddress(address.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
