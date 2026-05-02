import OneOrder from "../../components/orderHistory/OneOrder";
import UseOrderContext from "../../hooks/UseOrderContext";

export default function OrderHistory() {
  const { userOrders } = UseOrderContext();
  return (
    <div>
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
