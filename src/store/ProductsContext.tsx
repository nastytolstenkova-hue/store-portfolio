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

export interface ICartProduct extends IProduct {
  count: number;
}

export interface IProductContext {
  productsList: IProduct[];
  cartProducts: ICartProduct[];
  addCartProduct: (id:number) => void;
  summProd: number;
  totalPrice: number;
  countCartProduct: () => void;
  countSummaryPrice: () => void;

}



export const ProductsContext = createContext<IProductContext | undefined>(undefined)

export function ProductsContextProvider({children}:{children:ReactNode}){
  
  const [productsList, setProductsList] = useState<IProduct[]>([])
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
  const [summProd, setSummProd] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const countCartProduct = () => {
    const countProd = cartProducts.reduce((acc, prod) => {
    return acc + prod.count}, 0)
    setSummProd(countProd);
  };

  const countSummaryPrice = () => {
    const countProd = cartProducts.reduce((acc, prod) => {
    return acc + prod.count * prod.price}, 0)
    setTotalPrice(countProd);
  }

  const addCartProduct = (id: number) => {
  setCartProducts((prevCart) => {
    
    const existingProduct = prevCart.find(item => item.id === id);

    if (existingProduct) {
      
      return prevCart.map(item =>
        item.id === id 
          ? { ...item, count: item.count + 1 } 
          : item
      );
    }

    
    const productToAdd = productsList.find(prod => prod.id === id);

    if (productToAdd) {
      
      return [...prevCart, { ...productToAdd, count: 1 }];
    }

    return prevCart; 
  });
};

  useEffect(()=> {
    fetch('/products.json') 
    .then(response => response.json())
    .then(data => setProductsList(data))
    .catch(error => console.error('Ошибка загрузки:', error));
  }, [])


  return(
    <ProductsContext.Provider value={{productsList, cartProducts, addCartProduct, summProd, totalPrice, countCartProduct, countSummaryPrice}}>
      {children}
    </ProductsContext.Provider>
  )
}

