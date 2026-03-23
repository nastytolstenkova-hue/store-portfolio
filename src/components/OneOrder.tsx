import { type IOrder } from "../store/ProductsContext";

export default function OneOrder({ order }: { order: IOrder }) {
  return (
    <div className="border border-zinc-400/70 bg-amber-100/20 rounded-md py-2 px-3">
      <div className="flex justify-between">
        <p>{order.id}</p>
        <p>{order.status}</p>
      </div>
      <div className="flex justify-between">
        <p>{order.date}</p>
        <div className="flex flex-col">
          <p>Total Price:</p>
          <p>{order.totalPrice}</p>
        </div>
      </div>
      <ul className="flex  gap-2">
        {order.items.map((item) => (
          <li key={item.id} className="w-30 aspect-4/5 overflow-hidden py-2">
            <img className="w-16 h-16 object-cover rounded-md border border-zinc-200" src={item.image} alt={item.name} />
          </li>
        ))}
      </ul>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
          </li>
        ))}
      </ul>
      <div>
        <button>view details</button>
        <button>reorder</button>
      </div>
    </div>
  );
}
