import { useParams } from "react-router-dom";
import type { IProduct } from "../store/ProductsContext";
import { useState } from "react";
import { Link } from "react-router-dom";

import UseProductContext from "../hooks/UseProductContext";
import UseCartContext from "../hooks/UseCartContext";
import UseWishListContext from "../hooks/UseWishListContext";

export default function ProductPage() {
  const [quality, setQuality] = useState(1);
  const { id } = useParams<{ id: string }>();
  const { productsList } = UseProductContext();
  const { addCartProduct } = UseCartContext();
  const { addWishList } = UseWishListContext();

  const minusProduct = () => {
    if (quality === 1) return;
    setQuality((prevVal) => prevVal - 1);
  };

  const product: IProduct | undefined = productsList.find(
    (prod) => prod.id === Number(id),
  );



  const buttonDes = `flex justify-center items-center  p-1 w-7 h-7 bg-zinc-400/30 cursor-pointer `;
  const activeBatton =
    " hover:bg-zinc-500/40  transition-colors duration-300 active:scale-95";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-5 mt-5 ml-5 font-sans cursor-default">
      {product ? (
        <div>
          <div className="w-[80%] sm:w-full mx-auto">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-xl "
            />
          </div>
          <div>
            <p className="bg-yellow-300/20 w-fit px-2 uppercase rounded-full text-base">
              {product.category} lights
            </p>
            <h1 className="uppercase text-3xl my-3 tracking-wide line-clamp-2 w-4/5">
              {product.name}
            </h1>
            <h2 className="text-2xl">${product.price}</h2>
            <div className="my-5">
              <div className="uppercase tracking-wide">
                {product.inStock ? (
                  <div>
                    <span className="font-bold">✓ </span>in stock
                  </div>
                ) : (
                  <div>not available</div>
                )}
              </div>
              <p>
                <span className="font-medium text-base">Material: </span>
                {product.material}
              </p>
            </div>
            <p className="mr-1">{product.description}</p>

            <div className="grid grid-cols-[1fr_2fr] ml-5 my-5">
              <div className="flex border border-zinc-300 w-fit h-fit rounded-md ">
                <button
                  className={`${activeBatton} ${buttonDes}`}
                  onClick={minusProduct}
                >
                  -
                </button>

                <p className="flex justify-center items-center p-1 w-7 h-7">
                  {quality}
                </p>
                <button
                  className={`${activeBatton} ${buttonDes}`}
                  onClick={() => setQuality((prevVal) => prevVal + 1)}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  className="flex justify-center items-center mx-auto p-1 uppercase   bg-yellow-300/30   rounded-xl w-4/5 cursor-pointer  shadow-[0_0_10px_2px_rgba(255,180,0,0.5)] whitespace-nowrap hover:bg-yellow-300/50 hover:border-white transition-colors duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                  disabled={!product.inStock}
                  onClick={() => {
                    product.inStock && addCartProduct(product.id, quality);
                    setQuality(1);
                  }}
                >
                  {product.inStock ? "add to cart" : "out of stock"}
                </button>
              </div>
            </div>
            <button
              className="cursor-pointer  active:scale-95"
              onClick={() => addWishList(product.id)}
            >
              🤍{" "}
              <span className="underline text-base text-zinc-600 hover:text-black  transition-colors duration-300 ">
                add to wishlist
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-zinc-800 font-mono font-bold text-5xl uppercase tracking-[0.2em] mb-4">Product not found</h1>
          <p className="text-zinc-500 max-w-md mb-8 font-light">
            This product may have been removed or does not exist.
          </p>
          <Link to="/catalog" className="flex justify-center items-center mx-auto my-2 p-2 uppercase bg-zinc-300/30  shadow-[0_0_25px_5px_rgba(255,180,0,0.4)]  rounded-xl cursor-pointer whitespace-nowrap hover:bg-amber-400/50 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] hover:text-white   duration-300 active:scale-95 transition-all ">Back to catalog</Link>
        </div>
      )}
    </div>
  );
}
