import { useContext } from "react";
import { OrderContext } from "../store/OrderContext";

export default function UseOrderContext() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("There is problem with OrderContext.");
  }

  return context;
}
