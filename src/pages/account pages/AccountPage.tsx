import { NavLink, Outlet } from "react-router-dom";

import wishListImg from '../../image/icons/wish-list.png'
import logOutImg from '../../image/icons/log-out.png'
import personalInfoImg from '../../image/icons/personal-info.png'
import userOdersImg from '../../image/icons/your-orders.png'
import adressesImg from '../../image/icons/adresses.png'

import UseUserContext from "../../hooks/UseUserContext";

export default function AccountPage() {
  const {userInfo} = UseUserContext()
  const linkdes = ( isActive: boolean ) =>
    isActive
      ? " py-1 px-2 w-full rounded-xl cursor-pointer whitespace-nowrap bg-amber-300/30  transition-colors duration-300 border-amber-500/30 shadow-sm shadow-amber-800/50"
      : "hover:underline px-2 py-1"
    
      
  return (
    <div className="w-full mt-5 cursor-default">
      <div className="grid grid-cols-[1fr_2fr]">
        <div className="flex flex-col ml-5 pb-10 border border-zinc-200 px-8 rounded-2xl w-fit shadow-md h-[80vh] sticky top-5 justify-between">
          <div className="flex flex-col justify-center items-center my-3">
            <p>Welcome,</p>
            <p>{userInfo.userName}</p>
            <p>{userInfo.email}</p>
          </div>
          <div className="grid grid-cols-[1fr_6fr] gap-2 items-center">
            <img src={wishListImg} className={`h-5 w-5`}/>
            <NavLink to="/account/wishlist" className={({isActive})=>linkdes(isActive)}>Wish List</NavLink>
            <img src={userOdersImg} className={`h-5 w-5`}/>
            <NavLink to="/account/orders" className={({isActive})=>linkdes(isActive)}>Your orders</NavLink>
            <img src={personalInfoImg} className={`h-5 w-5`}/>
            <NavLink to="/account/profile" className={({isActive})=>linkdes(isActive)}>Personal Info</NavLink>
            <img src={adressesImg} className={`h-5 w-5`}/>
            <NavLink to="/account/adresses" className={({isActive})=>linkdes(isActive)}>Adresses</NavLink>
          </div>

          <div>
            <div className="border border-zinc-500"></div>
            <div className="grid grid-cols-[1fr_6fr]">
              <img src={logOutImg} className={`h-5 w-5`}/>
              <button className="flex justify-center cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95 ">Log Out</button>
            </div>
            
          </div>
        </div>
        <main className="px-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
