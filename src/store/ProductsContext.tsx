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

export interface UserInfo {
  id: number;
  userName: string;
  email: string;
  phone: string;
  birthDate: string;
  contactMethod: string;

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
  addWishList: (id:number) => void;
  removeWishList: (id:number) => void;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}



export const ProductsContext = createContext<IProductContext | undefined>(undefined)

export function ProductsContextProvider({children}:{children:ReactNode}){
  const [userInfo, setUserInfo] = useState<UserInfo>({id: 0,
  userName: "",
  email: "",
  phone: "",
  birthDate: "",
  contactMethod: "Email"});
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
const [wishList, setWishList] = useState<IProduct[]>(()=> {
  try {
    const saved = localStorage.getItem('wishList');
    return saved ? (JSON.parse(saved) as IProduct[]) : [];
  } catch (error) {
    console.error("Error wishlist parsing:", error);
    return [];
  }
});

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    localStorage.setItem('wishList', JSON.stringify(wishList))
  }, [cartProducts, wishList])
  

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

  const removeWishList = (id: number) => {
    setWishList((prevList) => 
    prevList.filter(item =>
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

const addWishList = (id: number) => {
  setWishList((prevList) => {
    
    const existingProduct = prevList.find(item => item.id === id);
    

    if (existingProduct) {
      return prevList
    }

    
    
    const productToAdd = productsList.find(prod => prod.id === id);

    if (productToAdd) {
      
      return [...prevList, { ...productToAdd}];
    }

    return prevList; 
  });
};

  useEffect(()=> {
    fetch('/products.json') 
    .then(response => response.json())
    .then(data => setProductsList(data))
    .catch(error => console.error('Loading error:', error));
  }, [])

  useEffect(()=> {
    fetch('/user-data.json') 
    .then(response => response.json())
    .then(data => setUserInfo(data))
    .catch(error => console.error('Loading error:', error));
  }, [])



  return(
    <ProductsContext.Provider value={{productsList, cartProducts, addCartProduct, summProd, totalPrice, plusProduct, minusProduct, removeProduct, inputSearcher, setInputSearcher, wishList, setWishList, addWishList, removeWishList, userInfo, setUserInfo}}>
      {children}
    </ProductsContext.Provider>
  )
}

