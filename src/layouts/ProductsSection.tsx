import UseProductContext from "../hooks/UseProductContext";
import OneProduct from "../components/OneProduct";

export default function ProductsSection(){
  
  const {productsList} = UseProductContext();

  return (
    <div className="m-5 ">
      <ul className="grid grid-cols-4 gap-2">
        {productsList.map((product)=>
        <li key={product.id}><OneProduct product={product}/></li>
        )}
      </ul>
    </div>
  )
}