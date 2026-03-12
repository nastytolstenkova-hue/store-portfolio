import { NavLink } from "react-router-dom";
import cart from '../image/icons/cartIcon.png'
import catalog from '../image/icons/catalog.png'
import user from '../image/icons/user.png'
import InputSearcher from "../components/InputSearcher";
import UseProductContext from "../hooks/UseProductContext";

const textWithIcon = ' flex m-3 items-center whitespace-nowrap mx-5'

export default function MainNavigation(){
  const {summProd} = UseProductContext()

  return (
    <div className="flex justify-between mt-1 mx-2">
      <div><NavLink to='/main' className='flex flex-1 items-center m-3 font-mono uppercase tracking-wide text-xl text-zinc-700 whitespace-nowrap'>Nordic Lights</NavLink></div>
      <div className="flex-[2] flex items-center justify-center ">
        <InputSearcher/>
      </div>
      
      <div className="flex-1 flex justify-end mx-3">
        <NavLink to='/catalog' className={textWithIcon}><img src={catalog} className="h-5 w-5 mr-2"/>Catalog</NavLink>
        <NavLink to='/account' className={textWithIcon}><img src={user} className="h-5 w-5 mr-2"/>Account</NavLink>
        <NavLink to='/cart' className={textWithIcon}><img src={cart} className="h-5 w-5 mr-2"/><div className="relative">{summProd > 0 && (
      <span className="absolute -top-5 right-0   flex items-center justify-center bg-amber-400/80 text-[11px] font-bold w-4 h-4 rounded-full shadow-sm">
        {summProd}
      </span>
    )}</div>Cart</NavLink>

      </div>
      
      
      
    </div>
  )
}