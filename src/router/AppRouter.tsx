import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";

import MainPage from "../pages/MainPage";
import AccountPage from "../pages/account pages/AccountPage";
import CartPage from "../pages/CartPage";
import CatalogPage from "../pages/CatalogPage";
import ErrorPage from "../pages/ErrorPage";
import TopLayout from "../layouts/TopLayout";
import ProductPage from "../pages/ProductPage";
import WishListPage from "../pages/account pages/WishListPage";
import OrderHistory from "../pages/account pages/OrderHistory";
import ProfileSettings from "../pages/account pages/ProfileSettings";
import Adresses from "../pages/account pages/Adresses";
import OneOrderDetails from "../components/orserHistory/OneOrderDetails";

export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TopLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/main", element: <MainPage /> },
        { path: "/catalog", element: <CatalogPage /> },
        { path: "/catalog/:id", element: <ProductPage /> },
        {
          path: "/account",
          element: <AccountPage />,
          children: [
            { index: true, element: <Navigate to="profile" /> },
            { path: "wishlist", element: <WishListPage /> },
            { path: "orders", element: <OrderHistory /> },
            { path: "profile", element: <ProfileSettings /> },
            { path: "adresses", element: <Adresses /> },
            { path: "orderDetails/:id", element: <OneOrderDetails /> },
          ],
        },
        { path: "/cart", element: <CartPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
