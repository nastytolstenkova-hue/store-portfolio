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
  cartProducts: IProduct[];
}

export const ProductsContext = createContext<IProductContext | undefined>(undefined)

export function ProductsContextProvider({children}:{children:ReactNode}){
  
  const [productsList, setProductsList] = useState([])
  const [cartProducts, setCartProducts] = useState([{
    "id": 9,
    "name": "Washi Paper Floor Lamp",
    "category": "floor",
    "price": 145.00,
    "material": "Paper, Wood",
    "description": "Japanese-inspired floor lamp featuring a Washi paper shade and wooden frame.",
    "image": "/image/productsPhoto/prod9.jpg",
    "inStock": true,
    "isNew": false
  },
  {
    "id": 9,
    "name": "Washi Paper Floor Lamp",
    "category": "floor",
    "price": 145.00,
    "material": "Paper, Wood",
    "description": "Japanese-inspired floor lamp featuring a Washi paper shade and wooden frame.",
    "image": "/image/productsPhoto/prod9.jpg",
    "inStock": true,
    "isNew": false
  },])

  useEffect(()=> {
    fetch('/products.json') 
    .then(response => response.json())
    .then(data => setProductsList(data))
    .catch(error => console.error('Ошибка загрузки:', error));
  }, [])


  return(
    <ProductsContext.Provider value={{productsList, cartProducts}}>
      {children}
    </ProductsContext.Provider>
  )
}

