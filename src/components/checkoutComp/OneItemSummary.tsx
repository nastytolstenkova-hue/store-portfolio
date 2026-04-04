import type { ICartProduct } from "../../store/CartContext";

export default function OneItemSummary({ product }: { product: ICartProduct }) {
  return (
    <div className="grid grid-cols-[1fr_3fr] mb-2 gap-2">
      <div>
        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md bg-zinc-100"/>
      </div>
      <div>
        <h4 className="text-sm line-clamp-1">{product.name}</h4>
        <div className="flex justify-between items-center">
          <p>x{product.count}</p>
          <p>${product.price * product.count}</p>
        </div>
      </div>
    </div>
  );
}
