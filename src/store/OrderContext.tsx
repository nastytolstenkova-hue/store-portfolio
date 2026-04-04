import { useState, useEffect, createContext, type ReactNode } from "react";

import { type IProduct } from "./ProductsContext";

export interface IOrderItem extends Pick<IProduct, 'id' | 'name' | 'price' | 'image'> {
  quantity: number; 
}

export interface IOrder {
  id: string;
  date: string;
  status: 'Delivered' | 'In Transit' | 'Processing'
  totalPrice: number;
  items: IOrderItem[];
}


export interface IOrderContext {
  userOrders: IOrder[];
  setUserOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

export const OrderContext = createContext<IOrderContext | undefined>(undefined)


export function OrderContextProvider({children}:{children:ReactNode}){
  const [userOrders, setUserOrders] = useState<IOrder[]>([])
  
 

   useEffect(()=> {
    fetch('/orders-data.json') 
    .then(response => response.json())
    .then(data => setUserOrders(data))
    .catch(error => console.error('Loading orders error:', error));
  }, [])



  return(
    <OrderContext.Provider value={{ userOrders, setUserOrders}}>
      {children}
    </OrderContext.Provider>
  )
}

