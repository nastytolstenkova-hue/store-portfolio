import UseWishListContext from "../../hooks/UseWishListContext";
import OneWishListProd from "../../components/wishListComp/OneWishListProd";
import { Link } from "react-router-dom";

export default function WishListPage() {
  const { wishList } = UseWishListContext();

  const summWishList = wishList.length;

  if (summWishList === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-zinc-800 font-mono font-bold text-5xl uppercase tracking-[0.2em] mb-4">Your Wish List is empty</h1>
          <p className="text-zinc-500 max-w-md mb-8 font-light">
            Find your products in our catalog
          </p>
          <Link to="/catalog" className="flex justify-center items-center mx-auto my-2 p-2 uppercase bg-zinc-300/30  shadow-[0_0_25px_5px_rgba(255,180,0,0.4)]  rounded-xl cursor-pointer whitespace-nowrap hover:bg-amber-400/50 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] hover:text-white   duration-300 active:scale-95 transition-all ">Back to catalog</Link>
        </div>
    )
  }

  return (
    <div className=" md:w-[90%] lg:w-[80%] xl:w-[70%] ">
      <h2 className="text-3xl uppercase font-mono flex justify-center bg-amber-300/30  p-2 rounded-2xl border border-amber-500/30 shadow-sm shadow-amber-800/50 mb-2">
        WishList
      </h2>
      <ul>
        {wishList.map((prod) => (
          <li key={prod.id}>
            <OneWishListProd product={prod} />
          </li>
        ))}
      </ul>{" "}
    </div>
  );
}
