import { useState, useEffect, createContext, type ReactNode } from "react";

import { type IProduct } from "./ProductsContext";

export interface IOrderItem extends Pick<
  IProduct,
  "id" | "name" | "price" | "image"
> {
  quantity: number;
}

export interface IOrder {
  id: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing";
  totalPrice: number;
  items: IOrderItem[];
}

export interface IOrderContext {
  userOrders: IOrder[];
  setUserOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
  sendOrder: (orderData: IOrder) => Promise<void>;
}

export const OrderContext = createContext<IOrderContext | undefined>(undefined);

export function OrderContextProvider({ children }: { children: ReactNode }) {
  const [userOrders, setUserOrders] = useState<IOrder[]>([]);

  

  const sendOrder = async (orderData: IOrder) => {
    const response = await fetch("/orders-data.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error("Failed to send order");
    return response.json();
  };

  useEffect(() => {
    fetch("/orders-data.json")
      .then((response) => response.json())
      .then((data) => setUserOrders(data))
      .catch((error) => console.error("Loading orders error:", error));
  }, []);

  return (
    <OrderContext.Provider value={{ userOrders, setUserOrders, sendOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
