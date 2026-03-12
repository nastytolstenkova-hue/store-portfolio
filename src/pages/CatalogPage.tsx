import { useState, useEffect } from "react"
import UseProductContext from "../hooks/UseProductContext";
import type { IProduct } from "../store/ProductsContext";
import OneProduct from "../components/OneProduct";

interface ICatalogPage {
  filtered: IProduct[]
}

export default function CatalogPage(){
  const {productsList} = UseProductContext();
  const [category, setCategory] = useState<string>('');

 
  
  const filtered = category.trim().toLowerCase() === '-' || category === '' ?  productsList : (productsList.filter((prod)=>prod.category === category.trim().toLowerCase()))



  return (
    <div>
      <div>
        <select 
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        id="product-category" 
        name="product-category"
        
        className="shadow-[0_0_25px_5px_rgba(255,180,0,0.4)] px-3 py-1 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] rounded-xl cursor-pointer uppercase duration-300  ">
          <option value="-">All Categories</option>
          <option value="ceiling">Ceiling</option>
          <option value="floor">Floor</option>
          <option value="wall">Wall</option>
          <option value="desktop">Desktop</option>
        </select>

    
        <button className="ml-4 bg-amber-300/50 px-4 rounded-full uppercase text-olive-600 cursor-pointer hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] hover:text-olive-800 active:scale-95">Find</button>
      </div>
      <ul className="grid grid-cols-3 gap-2">
        { filtered.map((prod)=><li key={prod.id}><OneProduct product={prod}/></li>)}

      </ul>

      

    </div>
  )
}