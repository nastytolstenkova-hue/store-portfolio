import {
  useState,
  useEffect,
  createContext,
  type ReactNode,
  useMemo,
} from "react";

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
  setSortBy: React.Dispatch<
    React.SetStateAction<"a-z" | "z-a" | "risingPrice" | "lowerPrice">
  >;
  sortBy: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  filtered: IProduct[];
  sortedProducts: IProduct[];
}

export const ProductsContext = createContext<IProductContext | undefined>(
  undefined,
);

export function ProductsContextProvider({ children }: { children: ReactNode }) {
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const [inputSearcher, setInputSearcher] = useState<string>("");
  const [sortBy, setSortBy] = useState<
    "a-z" | "z-a" | "risingPrice" | "lowerPrice"
  >("a-z");

  const [category, setCategory] = useState<string>("");

  const filtered = useMemo(() => {
    return productsList.filter((prod) => {
      const isCategoryMatch =
        category === "-" ||
        category === "" ||
        prod.category.toLowerCase() === category.toLowerCase();

      let isSearchMatch = true;
      if (inputSearcher.trim().length > 2) {
        isSearchMatch = prod.name
          .toLowerCase()
          .includes(inputSearcher.trim().toLowerCase());
      }

      return isCategoryMatch && isSearchMatch;
    });
  }, [productsList, category, inputSearcher]);

  const sortedProducts = useMemo(() => {
    const copy: IProduct[] = [...filtered];

    return copy.sort((a, b) => {
      if (sortBy === "a-z") return a.name.localeCompare(b.name);
      if (sortBy === "z-a") return b.name.localeCompare(a.name);
      if (sortBy === "risingPrice") return a.price - b.price;
      if (sortBy === "lowerPrice") return b.price - a.price;
      return 0;
    });
  }, [filtered, sortBy]);

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProductsList(data))
      .catch((error) => console.error("Loading product list error:", error));
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        productsList,
        inputSearcher,
        setInputSearcher,
        setSortBy,
        sortBy,
        category,
        setCategory,
        filtered,
        sortedProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
