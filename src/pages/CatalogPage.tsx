import { useState } from "react"
import UseProductContext from "../hooks/UseProductContext";
import type { IProduct } from "../store/ProductsContext";
import OneProduct from "../components/OneProduct";

export default function CatalogPage(){
  const {productsList} = UseProductContext();
  const [category, setCategory] = useState<string>('');
  const [listFilterProd, setListFilterProd] = useState<IProduct[]>(productsList)
  

  const filterProduct = (category: string) => {
    if (category.trim() === '-' || category === ''){
      setListFilterProd(productsList)
      return
    }

    setListFilterProd(productsList.filter((prod)=>prod.category === category.trim().toLowerCase()))
    
  }


  return (
    <div>
      <div>
        <input 
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        list="categories" 
        id="product-category" 
        name="product-category"
        placeholder="  Choose category "
        className="shadow-[0_0_25px_5px_rgba(255,180,0,0.4)] hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] rounded-xl cursor-pointer uppercase duration-300"/>

    
        <datalist id="categories">
            <option value="  -" />
            <option value="  ceiling" />
            <option value="  floor" />
            <option value="  wall" />
            <option value="  desktop" />
        </datalist>
        <button onClick={()=>filterProduct(category)} className="ml-4 bg-amber-300/50 px-4 rounded-full uppercase text-olive-600 cursor-pointer hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] hover:text-olive-800 active:scale-95">Find</button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {listFilterProd.length > 0 ? listFilterProd.map((prod)=><li key={prod.id}><OneProduct product={prod}/></li>) : productsList.map((prod)=><li key={prod.id}><OneProduct product={prod}/></li>)}

      </div>

      

    </div>
  )
}