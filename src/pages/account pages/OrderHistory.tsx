import OneOrder from "../../components/orderHistory/OneOrder";
import UseOrderContext from "../../hooks/UseOrderContext";
import UseAuthContext from "../../hooks/UseAuthContext";
import LoginForm from "../../components/loginComponents/LoginForm";
import RegistrationForm from "../../components/loginComponents/RegistrationForm";
import Button from "../../components/ui/Button";

export default function OrderHistory() {
  const { setFormLogIn, formLogIn, formSignUp, currentUser } = UseAuthContext();
  const { userOrders } = UseOrderContext();
  return (
    <div className="bg-amber-100/40 h-full rounded-md py-2 px-3 cursor-default">
      {formLogIn && <LoginForm />}
      {formSignUp && <RegistrationForm />}
      {currentUser ? (
        <div>
          <h2 className="text-xl m-2">Your Orders</h2>
          <ul className="grid grid-cols-2 gap-3 items-stretch auto-rows-fr">
            {userOrders.map((order) => (
              <li key={order.id}>
                <OneOrder order={order} />
              </li>
            ))}
          </ul>
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
