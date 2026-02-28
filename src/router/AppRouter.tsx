import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "../pages/MainPage";
import AccountPage from "../pages/AccountPage";
import CartPage from "../pages/CartPage";
import CatalogPage from "../pages/CatalogPage";
import ErrorPage from "../pages/ErrorPage";
import TopLayout from "../layouts/TopLayout";

export default function AppRouter(){
  const router = createBrowserRouter([{
    path:'/',
    element: <TopLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {path:'/main', element:<MainPage/>},
      {path:'/catalog', element:<CatalogPage/>},
      {path:'/account', element:<AccountPage/>},
      {path:'/cart', element:<CartPage/>},
    ]
}])

  return (
    <RouterProvider router={router}/>
    
  )
}