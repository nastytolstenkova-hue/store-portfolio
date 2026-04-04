import { useState, useEffect, createContext, type ReactNode } from "react";

export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  material: string;
  description: string;
  image: string;
  inStock: boolean;
  isNew: boolean;
}

export interface IProductContext {
  productsList: IProduct[];
  inputSearcher: string;
  setInputSearcher: React.Dispatch<React.SetStateAction<string>>;
}

export const ProductsContext = createContext<IProductContext | undefined>(
  undefined,
);

export function ProductsContextProvider({ children }: { children: ReactNode }) {
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [inputSearcher, setInputSearcher] = useState<string>("");

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProductsList(data))
      .catch((error) => console.error("Loading product list error:", error));
  }, []);

  return (
    <ProductsContext.Provider
      value={{ productsList, inputSearcher, setInputSearcher }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
