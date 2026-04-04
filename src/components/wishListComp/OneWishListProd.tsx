import type { IProduct } from "../../store/ProductsContext";
import UseCartContext from "../../hooks/UseCartContext";
import UseWishListContext from "../../hooks/UseWishListContext";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";

export default function OneWishListProd({ product }: { product: IProduct }) {
  const { addCartProduct } = UseCartContext();
  const { removeWishList } = UseWishListContext();

  return (
    <div className="grid grid-cols-[1fr_2fr] border border-zinc-500/50 h-fit rounded-md p-2 mb-2 ">
      <NavLink
        to={`/catalog/${product.id}`}
        className="w-30 aspect-4/5 overflow-hidden rounded-md transition-transform duration-500 hover:scale-105"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover  bg-zinc-100  "
        />
      </NavLink>
      <div>
        <NavLink
          to={`/catalog/${product.id}`}
          className="mt-3 mx-2 text-lg tracking-tight whitespace-nowrap hover:underline cursor-pointer"
        >
          {product.name}
        </NavLink>
        <p className="mx-2">{product.material}</p>
        <div className="flex justify-between mx-2 mt-3 text-base ">
          <p>Price:</p>

          <div className="">
            <Button
              text="Add to cart"
              onClick={() => addCartProduct(product.id)}
              className="p-1.5"
            />
          </div>
        </div>
        <div className="flex justify-between mx-2 ">
          <p>${product.price}</p>
          <button
            className="underline text-base text-zinc-600 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95"
            onClick={() => removeWishList(product.id)}
          >
            Remove from wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
