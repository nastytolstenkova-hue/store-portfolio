import UseWishListContext from "../hooks/UseWishListContext";
import UseCartContext from "../hooks/UseCartContext";

import type { IProduct } from "../store/ProductsContext";

import { Link } from "react-router-dom";
import Button from "./ui/Button";

export default function OneProduct({ product }: { product: IProduct }) {
  const { wishList, addWishList, removeWishList } = UseWishListContext();
  const { addCartProduct } = UseCartContext();

  const isInWishList = wishList.find((prod) => prod.id === product.id);

  const toggleWishList = (id: number) => {
    const exist = wishList.find((prod) => prod.id === product.id);
    if (exist) {
      removeWishList(id);
      return;
    }
    addWishList(id);
    return;
  };

  return (
    <div className="flex flex-col border border-zinc-200 rounded-md">
      <div className="w-full aspect-3/4 overflow-hidden p-2">
        <Link to={`/catalog/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full  rounded-md object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      </div>

      <div className="flex justify-center items-center min-h-14 px-2 text-center">
        <Link
          to={`/catalog/${product.id}`}
          className="block uppercase text-base font-mono  mx-auto max-w-[90%] tracking-tight line-clamp-2 leading-tight mt-3  hover:underline cursor-pointer"
        >
          {product.name}
        </Link>
      </div>

      <p className="text-zinc-600 line-clamp-2 ">{product.description}</p>

      <div className="flex justify-between mx-4 my-3">
        <p>price:</p>
        <p>{product.price}</p>
      </div>

      <div className="grid grid-cols-[5fr_1fr] justify-center items-center">
        <Button
          text={product.inStock ? "add to cart" : "out of stock"}
          disabled={!product.inStock}
          onClick={() => product.inStock && addCartProduct(product.id)}
          className="mx-auto w-4/5 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
        />

        <button
          onClick={() => toggleWishList(product.id)}
          className={`text-3xl p-1 cursor-pointer active:scale-95    ${isInWishList ? "text-amber-300" : "text-zinc-700 "}`}
        >
          {isInWishList ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}
