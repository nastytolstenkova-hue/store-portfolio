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
  plusProduct: (id:number) => void;
  minusProduct: (id:number) => void;
  removeProduct: (id:number) => void;
}



export const ProductsContext = createContext<IProductContext | undefined>(undefined)

export function ProductsContextProvider({children}:{children:ReactNode}){
  
  const [productsList, setProductsList] = useState<IProduct[]>([])
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>(()=> {
  try {
    const saved = localStorage.getItem('cartProducts');
    return saved ? (JSON.parse(saved) as ICartProduct[]) : [];
  } catch (error) {
    console.error("Error cart parsing:", error);
    return [];
  }
});

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
  }, [cartProducts])
  

  const summProd = cartProducts.reduce((acc, prod) => acc + prod.count, 0);
  
  const totalPrice = cartProducts.reduce((acc, prod) => acc + (prod.count * prod.price), 0);

  const plusProduct = (id: number) => {
    setCartProducts((prevCart) =>  prevCart.map(item =>
        item.id === id 
          ? { ...item, count: item.count + 1 } 
          : item
      )
    )
  }

  const minusProduct = (id: number) => {
    setCartProducts((prevCart) => {
    const existingItem = prevCart.find(item => item.id === id);

    
    if (!existingItem) return prevCart;

    
    if (existingItem.count === 1) {
      return prevCart.filter(item => item.id !== id);
    }

   
    return prevCart.map(item =>
      item.id === id ? { ...item, count: item.count - 1 } : item
    );
  });
};

  const removeProduct = (id: number) => {
    setCartProducts((prevCart) => 
    prevCart.filter(item =>
      item.id !== id
    )
  )
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
    <ProductsContext.Provider value={{productsList, cartProducts, addCartProduct, summProd, totalPrice, plusProduct, minusProduct, removeProduct}}>
      {children}
    </ProductsContext.Provider>
  )
}

