import OneOrder from "../../components/OneOrder";
import UseProductContext from "../../hooks/UseProductContext";

export default function OrderHistory() {
  const { userOrders } = UseProductContext();
  return (
    <div className="border border-zinc-400/30 bg-amber-100/20 rounded-md py-2 px-3 cursor-default">
      <h2 className="text-xl m-2">Your Orders</h2>
      <ul className="grid grid-cols-2 gap-3 items-stretch auto-rows-fr">
        {userOrders.map((order) => (
          <li key={order.id}>
            <OneOrder order={order} />
          </li>
        ))}
      </ul>
    </div>
  );
}
