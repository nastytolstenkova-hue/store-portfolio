import { useState, useEffect, createContext, type ReactNode } from "react";
import { type IProduct } from "./ProductsContext";
import UseProductContext from "../hooks/UseProductContext";

export interface IWishListContext {
  wishList: IProduct[];
  setWishList: React.Dispatch<React.SetStateAction<IProduct[]>>;
  addWishList: (id: number) => void;
  removeWishList: (id: number) => void;
}

export const WishListContext = createContext<IWishListContext | undefined>(
  undefined,
);

export function WishListContextProvider({ children }: { children: ReactNode }) {
  const { productsList } = UseProductContext();
  const [wishList, setWishList] = useState<IProduct[]>(() => {
    try {
      const saved = localStorage.getItem("wishList");
      return saved ? (JSON.parse(saved) as IProduct[]) : [];
    } catch (error) {
      console.error("Error wishlist parsing:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  const removeWishList = (id: number) => {
    setWishList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const addWishList = (id: number) => {
    setWishList((prevList) => {
      const existingProduct = prevList.find((item) => item.id === id);

      if (existingProduct) {
        return prevList;
      }

      const productToAdd = productsList.find((prod) => prod.id === id);

      if (productToAdd) {
        return [...prevList, { ...productToAdd }];
      }

      return prevList;
    });
  };

  return (
    <WishListContext.Provider
      value={{
        wishList,
        setWishList,
        addWishList,
        removeWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
