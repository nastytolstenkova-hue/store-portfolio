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
  addCartProduct: (id:number, quantity?:number) => void;
  summProd: number;   
  totalPrice: number;
  plusProduct: (id:number) => void;
  minusProduct: (id:number) => void;
  removeProduct: (id:number) => void;
  inputSearcher: string;
  setInputSearcher: React.Dispatch<React.SetStateAction<string>>;
  wishList: IProduct[];
  setWishList: React.Dispatch<React.SetStateAction<IProduct[]>>;
}



export const ProductsContext = createContext<IProductContext | undefined>(undefined)

export function ProductsContextProvider({children}:{children:ReactNode}){
  
  const [productsList, setProductsList] = useState<IProduct[]>([])
  const [inputSearcher, setInputSearcher] = useState<string>('');
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>(()=> {
  try {
    const saved = localStorage.getItem('cartProducts');
    return saved ? (JSON.parse(saved) as ICartProduct[]) : [];
  } catch (error) {
    console.error("Error cart parsing:", error);
    return [];
  }
});
const [wishList, setWishList] = useState<IProduct[]>([{
    "id": 10,
    "name": "Marble Sphere Table Lamp",
    "category": "desktop",
    "price": 280.00,
    "material": "Marble, Glass",
    "description": "Solid marble base topped with a perfectly smooth frosted glass sphere.",
    "image": "/image/productsPhoto/prod10.jpg",
    "inStock": false,
    "isNew": false
  },
  {
    "id": 11,
    "name": "Arc Reading Lamp",
    "category": "floor",
    "price": 420.00,
    "material": "Chrome",
    "description": "Classic curved arc lamp for the living room, finished in brushed chrome.",
    "image": "/image/productsPhoto/prod11.jpg",
    "inStock": true,
    "isNew": false
  },
  {
    "id": 12,
    "name": "Smoked Glass Pendant",
    "category": "ceiling",
    "price": 310.00,
    "material": "Smoked Glass",
    "description": "Moody pendant light made of dark smoked glass with gold interior accents.",
    "image": "/image/productsPhoto/prod12.jpg",
    "inStock": true,
    "isNew": true
  }]);


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

  const addCartProduct = (id: number, quantity = 1) => {
  setCartProducts((prevCart) => {
    
    const existingProduct = prevCart.find(item => item.id === id);
    

    if (existingProduct) {
      const newQuantity = existingProduct.count + quantity
      
      
      return prevCart.map(item =>
        item.id === id 
          ? { ...item, count: newQuantity } 
          : item
      );
    
  
    }

    
    const productToAdd = productsList.find(prod => prod.id === id);

    if (productToAdd) {
      
      return [...prevCart, { ...productToAdd, count: quantity }];
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
    <ProductsContext.Provider value={{productsList, cartProducts, addCartProduct, summProd, totalPrice, plusProduct, minusProduct, removeProduct, inputSearcher, setInputSearcher, wishList, setWishList}}>
      {children}
    </ProductsContext.Provider>
  )
}

