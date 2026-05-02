import MainNavigation from "../router/MainNavigation";
import UseAuthContext from "../hooks/UseAuthContext";
import LoginForm from "../components/loginComponents/LoginForm";
import RegistrationForm from "../components/loginComponents/RegistrationForm";

import { Outlet } from "react-router-dom";

export default function TopLayout() {
  const { formLogIn, formSignUp } = UseAuthContext();
  return (
    <div>
      {formLogIn && <LoginForm />}
      {formSignUp && <RegistrationForm />}

      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
