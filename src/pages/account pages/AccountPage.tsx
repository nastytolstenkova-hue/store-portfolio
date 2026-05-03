import { NavLink, Outlet } from "react-router-dom";

import wishListImg from "../../image/icons/wish-list.png";
import logOutImg from "../../image/icons/log-out.png";
import personalInfoImg from "../../image/icons/personal-info.png";
import userOdersImg from "../../image/icons/your-orders.png";
import addressesImg from "../../image/icons/addresses.png";

import UseAuthContext from "../../hooks/UseAuthContext";

export default function AccountPage() {
  const { currentUser, logout, setFormLogIn } = UseAuthContext();

  const linkdes = (isActive: boolean) =>
    isActive
      ? " py-1 px-2 w-full rounded-xl cursor-pointer whitespace-nowrap bg-amber-300/30  transition-colors duration-300 border-amber-500/30 shadow-sm shadow-amber-800/50"
      : "hover:underline px-2 py-1";

  return (
    <div className="w-full mt-5 cursor-default ">
      <div className="grid grid-cols-[1fr_2fr] xl:text-xl">
        <div className="flex flex-col items-center bg-amber-300/30 ml-5 pb-10 border border-zinc-200 px-8 rounded-2xl w-fit shadow-md h-[80vh] sticky top-5 justify-between xl:w-[50%]">
          <div className="flex flex-col justify-center items-center my-3">
            <p>Welcome,</p>
            {currentUser ? (
              <div>
                <p className="flex mx-auto justify-center ">{currentUser.userName}</p>
                <p className="flex mx-auto justify-center ">{currentUser.email}</p>
              </div>
            ) : (
              <p>user</p>
            )}
          </div>
          <div className="grid grid-cols-[1fr_6fr] gap-2 items-center">
            <img src={wishListImg} className={`h-5 w-5`} />
            <NavLink
              to="/account/wishlist"
              className={({ isActive }) => linkdes(isActive)}
            >
              Wish List
            </NavLink>
            <img src={userOdersImg} className={`h-5 w-5`} />
            <NavLink
              to="/account/orders"
              className={({ isActive }) => linkdes(isActive)}
            >
              Your orders
            </NavLink>
            <img src={personalInfoImg} className={`h-5 w-5`} />
            <NavLink
              to="/account/profile"
              className={({ isActive }) => linkdes(isActive)}
            >
              Personal Info
            </NavLink>
            <img src={addressesImg} className={`h-5 w-5`} />
            <NavLink
              to="/account/addresses"
              className={({ isActive }) => linkdes(isActive)}
            >
              Addresses
            </NavLink>
          </div>

          <div>
            <div className="border border-zinc-500"></div>
            <div className="grid grid-cols-[1fr_6fr]">
              <img src={logOutImg} className={`h-5 w-5`} />
              <button
                className="flex justify-center text-zinc-700 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95 "
                onClick={() => {
                  currentUser ? logout() : setFormLogIn(true);
                }}
              >
                {currentUser ? "Log out" : "Log in"}
              </button>
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
