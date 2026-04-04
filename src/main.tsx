import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProductsContextProvider } from "./store/ProductsContext";
import { CartContextProvider } from "./store/CartContext.tsx";
import { OrderContextProvider } from "./store/OrderContext.tsx";
import { UserContextProvider } from "./store/UserContext.tsx";
import { WishListContextProvider } from "./store/WishListContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductsContextProvider>
      <OrderContextProvider>
        <UserContextProvider>
          <WishListContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </WishListContextProvider>
        </UserContextProvider>
      </OrderContextProvider>
    </ProductsContextProvider>
  </StrictMode>,
);
