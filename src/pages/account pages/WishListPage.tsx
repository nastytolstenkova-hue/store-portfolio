import UseProductContext from "../../hooks/UseProductContext";
import OneWishListProd from "../../components/OneWishListProd";

export default function WishListPage(){
  const {wishList} = UseProductContext();
  return (
    <div>
      <h2>WishList</h2>
      <ul>
        {wishList.map((prod)=>
        <li key={prod.id}><OneWishListProd product={prod}/></li>)}
      </ul>

      
    </div>
  )
}