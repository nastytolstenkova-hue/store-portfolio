import UseOrderContext from "../../hooks/UseOrderContext";
import type { IOrder } from "../../store/OrderContext";
import OneOrderProduct from "./OneOrderProduct";
import { useParams } from "react-router-dom";

export default function OneOrderDetails() {
  const { id } = useParams<{ id: string }>();
  const { userOrders } = UseOrderContext();
  const currentOrder = userOrders.find((order: IOrder) => order.id === id);
  if (!currentOrder) {
    return <div>Order not found</div>;
  }

  return (
    <div className="bg-amber-200/30 p-3 rounded-md">
      <h2 className="text-xl font-bold mb-4">
        Order Details: {currentOrder.id}
      </h2>
      <div className="flex mb-4">
        <p className="mr-4">Order Date: {currentOrder.date}</p>
        <p className="mr-4">Status: {currentOrder.status}</p>
        <p>Total: {currentOrder.totalPrice}</p>
      </div>
      <div>
        <h3 className="text-lg">Product Details</h3>
        <ul>
          {currentOrder.items.map((product) => (
            <li key={product.id}>
              <OneOrderProduct product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
