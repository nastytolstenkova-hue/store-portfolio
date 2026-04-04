import { useContext } from "react";
import { WishListContext } from "../store/WishListContext";


export default function UseWishListContext() {
  const context = useContext(WishListContext);
  if (!context) {
    throw new Error("There is problem with WishListContext.");
  }

  return context;
}
