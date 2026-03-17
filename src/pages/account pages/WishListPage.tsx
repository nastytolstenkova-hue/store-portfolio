import UseProductContext from "../../hooks/UseProductContext";
import OneWishListProd from "../../components/OneWishListProd";

export default function WishListPage(){
  const {wishList} = UseProductContext();
  return (
    <div>
      <h2 className="text-3xl uppercase font-mono flex justify-center bg-amber-300/30  p-2 rounded-2xl border border-amber-500/30 shadow-sm shadow-amber-800/50 mb-2">WishList</h2>
      <ul>
        {wishList.map((prod)=>
        <li key={prod.id}><OneWishListProd product={prod}/></li>)}
      </ul>

      
    </div>
  )
}