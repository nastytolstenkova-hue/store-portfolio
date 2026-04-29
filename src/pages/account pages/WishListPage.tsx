import UseWishListContext from "../../hooks/UseWishListContext";
import OneWishListProd from "../../components/wishListComp/OneWishListProd";
import UseAuthContext from "../../hooks/UseAuthContext";
import LoginForm from "../../components/loginComponents/LoginForm";
import RegistrationForm from "../../components/loginComponents/RegistrationForm";
import Button from "../../components/ui/Button";

export default function WishListPage() {
  const { wishList } = UseWishListContext();
  const { setFormLogIn, formLogIn, formSignUp, currentUser } = UseAuthContext();
  return (
    <div className="bg-amber-100/40 h-full rounded-md">
      {formLogIn && <LoginForm />}
      {formSignUp && <RegistrationForm />}
      {currentUser ? (
        <div>
          <h2 className="text-3xl uppercase font-mono flex justify-center bg-amber-300/30  p-2 rounded-2xl border border-amber-500/30 shadow-sm shadow-amber-800/50 mb-2">
            WishList
          </h2>
          <ul>
            {wishList.map((prod) => (
              <li key={prod.id}>
                <OneWishListProd product={prod} />
              </li>
            ))}
          </ul>{" "}
        </div>
      ) : (
        <div className="m-3 flex flex-col">
          <p className="flex justify-center m-5">
            Log in or sign up to see the information
          </p>
          <Button text="Login" onClick={() => setFormLogIn(true)} />
        </div>
      )}
    </div>
  );
}
