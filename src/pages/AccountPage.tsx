import { NavLink } from "react-router-dom"

export default function AccountPage(){
  return (
    <div className="">
      <h2 className="flex justify-center text-3xl uppercase">my account</h2>
      
      <div className="flex flex-col ml-5 border border-zinc-200 px-8 rounded-2xl w-fit shadow-md h-[80vh] sticky top-5 ">
      <div className="flex flex-col justify-center items-center my-3">
        <p>Welcome,</p>
        <p>User Name</p>
        <p>user@gmail.com</p>
      </div>
      <div className="flex flex-col">
        <NavLink to='/account/wishlist'>Wish List</NavLink>
        <NavLink to='/account/orders'>Your orders</NavLink>
        <NavLink to='/account/profile'>Personal Info</NavLink>
        <NavLink to='/account/adresses'>Adresses</NavLink>

      </div>
      <div><button>Log Out</button></div>
      
      
    </div>
    <div>
      
    </div>

    </div>
    
  )
}