import type { IOrder } from "../../store/OrderContext";
import { NavLink } from "react-router-dom";

export default function OneOrder({ order }: { order: IOrder }) {
  const orderColor =
    order.status === "Delivered"
      ? " bg-green-400/60"
      : order.status === "In Transit"
        ? "bg-blue-400/60"
        : order.status === "Processing"
          ? "bg-yellow-400/60"
          : order.status === "Processing"
            ? "bg-orange-400/60"
            : "";

  const summProd = order.items.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const twoProd =
    order.items.length >= 2 ? order.items.slice(0, 2) : order.items;

  const summRestProd =
    summProd - twoProd.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <div className="flex flex-col border border-zinc-400/70 bg-amber-100/20 rounded-md py-2 px-3 text-base h-full">
      <div className="flex justify-between items-center mb-2">
        <p className="line-clamp-1">{order.id}</p>
        <p
          className={`${orderColor} rounded-full px-2 tracking-tight line-clamp-1`}
        >
          {order.status}
        </p>
      </div>
      <div className="flex justify-between items-center mb-3">
        <p>{order.date}</p>
        <div className="flex flex-col">
          <p>Total Price:</p>
          <p>{order.totalPrice}</p>
        </div>
      </div>
      <div className="h-20 mb-2">
        <ul className="flex justify-center gap-4">
          {twoProd.map((item) => (
            <li
              key={item.id}
              className="flex justify-center overflow-hidden py-2"
            >
              <img
                className="w-16 h-16 object-cover rounded-md border border-zinc-200"
                src={item.image}
                alt={item.name}
              />
            </li>
          ))}
        </ul>
      </div>

      <ul className="">
        {twoProd.map((item) => (
          <li key={item.id} className="flex justify-between items-center my-2">
            <p className="line-clamp-1">{item.name}</p>
            <p>{item.quantity}</p>
          </li>
        ))}
        <p className="flex justify-end my-2">
          {summRestProd > 0 && `+${summRestProd}`}
        </p>
      </ul>
      <div className="flex justify-between items-center py-1 mt-auto">
        <NavLink
          to={`/account/orderDetails/${order.id}`}
          className="flex my-3 w-[60%] mb-2 p-1 uppercase border border-zinc-300 shadow-[0_0_10px_2px_rgba(255,180,0,0.5)] bg-yellow-500/20 rounded-xl cursor-pointer whitespace-nowrap hover:bg-yellow-500/30  transition-colors duration-300 active:scale-95 "
        >
          view details
        </NavLink>
        <button className="flex underline text-sm text-zinc-900 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95">
          reorder
        </button>
      </div>
    </div>
  );
}
