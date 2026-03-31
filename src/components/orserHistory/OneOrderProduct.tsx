import type { IOrderItem } from "../../store/ProductsContext";
import { NavLink } from "react-router-dom";

export default function OneOrderProduct({ product }: { product: IOrderItem }) {
  console.log(product.id);
  console.log(product);

  return (
    <div className="grid grid-cols-[1fr_3fr] h-full bg-amber-200/30 p-3 rounded-md my-2">
      <div className="w-30 aspect-4/5 overflow-hidden p-2">
        <img
          className="w-full h-full object-cover rounded-md bg-zinc-100"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <h4>{product.name}</h4>
          <p>{product.quantity}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>{product.id}</p>
          <p>{product.price}</p>
        </div>
        <div className="flex justify-between items-center mt-auto gap-3">
          <button className="flex-1 my-3 w-fit mb-2 p-1 uppercase border border-zinc-300 shadow-[0_0_10px_2px_rgba(255,180,0,0.5)] bg-yellow-500/20 rounded-xl cursor-pointer whitespace-nowrap hover:bg-yellow-500/30  transition-colors duration-300 active:scale-95 ">
            write a review
          </button>
          <NavLink
            to={`/catalog/${product.id}`}
            className="flex-1 my-3 w-fit mb-2 p-1 uppercase border border-zinc-300 shadow-[0_0_10px_2px_rgba(255,180,0,0.5)] bg-yellow-500/20 rounded-xl cursor-pointer whitespace-nowrap hover:bg-yellow-500/30  transition-colors duration-300 active:scale-95 "
          >
            view product page
          </NavLink>
        </div>
      </div>
    </div>
  );
}
