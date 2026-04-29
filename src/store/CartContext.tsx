import { useState, useEffect, createContext, type ReactNode } from "react";
import type { IProduct } from "./ProductsContext";
import UseProductContext from "../hooks/UseProductContext";

import UseAuthContext from "../hooks/UseAuthContext";

export interface ICartProduct extends IProduct {
  count: number;
}

export interface ICartContext {
  cartProducts: ICartProduct[];
  setCartProducts: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
  addCartProduct: (id: number, quantity?: number) => void;
  summProd: number;
  totalPrice: number;
  plusProduct: (id: number) => void;
  minusProduct: (id: number) => void;
  removeProduct: (id: number) => void;
}

export const CartContext = createContext<ICartContext | undefined>(undefined);

export function CartContextProvider({ children }: { children: ReactNode }) {
  const { productsList } = UseProductContext();
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>(() => {
    try {
      const saved = localStorage.getItem("cartProducts");
      return saved ? (JSON.parse(saved) as ICartProduct[]) : [];
    } catch (error) {
      console.error("Error cart parsing:", error);
      return [];
    }
  });

  const { currentUser } = UseAuthContext();

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    if (!currentUser) {
      localStorage.removeItem("cartProducts");
    }
  }, [currentUser]);

  const summProd = cartProducts.reduce((acc, prod) => acc + prod.count, 0);

  const totalPrice = cartProducts.reduce(
    (acc, prod) => acc + prod.count * prod.price,
    0,
  );

  const plusProduct = (id: number) => {
    setCartProducts((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };

  const minusProduct = (id: number) => {
    setCartProducts((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);

      if (!existingItem) return prevCart;

      if (existingItem.count === 1) {
        return prevCart.filter((item) => item.id !== id);
      }

      return prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item,
      );
    });
  };

  const removeProduct = (id: number) => {
    setCartProducts((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const addCartProduct = (id: number, quantity = 1) => {
    setCartProducts((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === id);

      if (existingProduct) {
        const newQuantity = existingProduct.count + quantity;

        return prevCart.map((item) =>
          item.id === id ? { ...item, count: newQuantity } : item,
        );
      }

      const productToAdd = productsList.find((prod) => prod.id === id);

      if (productToAdd) {
        return [...prevCart, { ...productToAdd, count: quantity }];
      }

      return prevCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addCartProduct,
        summProd,
        totalPrice,
        plusProduct,
        minusProduct,
        removeProduct,
        setCartProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
