import MainNavigation from "../router/MainNavigation";

import { Outlet } from "react-router-dom";

export default function TopLayout(){
  return (
    <div>
      
      <MainNavigation/>
      <main>
        <Outlet/>
      </main>
      
    </div>
  )
}