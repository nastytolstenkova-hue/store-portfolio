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
  userId: string;
  date: string;
  status: "Delivered" | "In Transit" | "Processing";
  totalPrice: number;
  items: IOrderItem[]; 
 
}

export interface IOrderContext {
  userOrders: IOrder[];
  setUserOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
  sendOrder: (orderData: IOrder) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

export const OrderContext = createContext<IOrderContext | undefined>(undefined);

export function OrderContextProvider({ children }: { children: ReactNode }) {
  const [userOrders, setUserOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  

  const sendOrder = async (orderData: IOrder) => {
    const response = await fetch("/orders-data.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error("Failed to send order. Try again later");
    return response.json();
  };

  useEffect(() => {
    setError(null); 
    setIsLoading(true);

    fetch("/orders-data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load order list.");
        }
        return response.json();
      })
      .then((data) => {
        setUserOrders(data);
      })
      .catch((err) => {
        console.error("Loading orders error:", err);
        setError(err.message || "Something went wrong...");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <OrderContext.Provider value={{ userOrders, setUserOrders, sendOrder, error, isLoading }}>
      {children}
    </OrderContext.Provider>
  );
}
