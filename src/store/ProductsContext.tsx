import { useState, useEffect, createContext, type ReactNode } from "react";

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  material: string;
  description: string;
  image: string;
  inStock: boolean
  isNew: boolean;
}

export interface IProductContext {
  productsList: IProduct[];
}

export const ProductsContext = createContext<IProductContext | undefined>(undefined)

export function ProductsContextProvider({children}:{children:ReactNode}){
  const [productsList, setProductsList] = useState([])


  return(
    <ProductsContext.Provider value={{productsList}}>
      {children}
    </ProductsContext.Provider>
  )
}

