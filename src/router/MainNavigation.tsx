import { NavLink } from "react-router-dom";
import cart from '../image/icons/cartIcon.png'
import catalog from '../image/icons/catalog.png'
import user from '../image/icons/user.png'
import InputSearcher from "../components/InputSearcher";


export default function MainNavigation(){

  return (
    <div className="flex">
      <div><NavLink to='/main' className='flex m-3'>Nordic Lights</NavLink></div>
      <div>
        <InputSearcher/>
      </div>
      
      <div className="flex">
        <NavLink to='/catalog' className='flex m-3'><img src={catalog} className="h-5 w-5 mr-2"/>Catalog</NavLink>
        <NavLink to='/account' className='flex m-3'><img src={user} className="h-5 w-5 mr-2"/>Account</NavLink>
        <NavLink to='/cart' className='flex m-3'><img src={cart} className="h-5 w-5 mr-2"/>Cart</NavLink>

      </div>
      
      
      
    </div>
  )
}