import OneOrder from "../../components/orderHistory/OneOrder";
import UseOrderContext from "../../hooks/UseOrderContext";

export default function OrderHistory() {
  const { userOrders, error, isLoading } = UseOrderContext();

  if (isLoading) return <div className="text-xl">Uploading your orders...</div>;
  if (error) return <div className="text-red-600 text-xl">Ошибка: {error}</div>;

  return (
    <div>
      <h2 className="text-3xl uppercase font-mono flex justify-center bg-amber-300/30  p-2 rounded-2xl border border-amber-500/30 shadow-sm shadow-amber-800/50 mb-2">Your Orders</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-3 items-stretch auto-rows-fr">
        {userOrders.map((order) => (
          <li key={order.id}>
            <OneOrder order={order} />
          </li>
        ))}
      </ul>
    </div>
  );
}
