import { useState } from "react";
import UseAuthContext from "../../hooks/UseAuthContext";
import Button from "../ui/Button";

export default function RegistrationForm() {
  const [userPassword, setUserPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [blankFields, setBlankFields] = useState<boolean>(
    false
  );

  const { setFormSignUp, signUp, setFormLogIn } = UseAuthContext();

  const handleSignUp = () => {
    if (
      phone.length >= 5 &&
      userName.trim().length >= 3 &&
      email.trim().length >= 5
    ) {
      signUp(email, phone, userName, userPassword, repeatPassword);
      setBlankFields(false);
      setFormSignUp(false);
      setUserPassword('');
      setRepeatPassword('');
      setUserName('');
      setEmail('');
      setPhone('');
    }
    setBlankFields(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col bg-amber-200/40 p-3 pt-6 rounded-md border border-zinc-500/40 mb-3 relative  mx-3  dark:bg-zinc-800  shadow-amber-400/70  w-[50%]">
        <h3 className="mb-3 flex justify-center items-center text-xl text-zinc-800 ">
          Registration form
        </h3>
        <button
          type="button"
          className="text-amber-200 rounded-xs w-6 h-6 ml-7.5 absolute top-2 right-4  active:cursor-pointer hover:cursor-pointer hover:text-amber-300"
          onClick={() => setFormSignUp(false)}
        >
          ✕
        </button>
        <input
          className="w-full border rounded-md px-2 mb-2 bg-white/30  p-1 border-white/50 shadow-white-md outline-0 text-zinc-800"
          placeholder="first and last name"
          value={userName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserName(e.target.value)
          }
        />
        <input
          className="w-full border rounded-md px-2 mb-2 bg-white/30  p-1 border-white/50 shadow-white-md outline-0 text-zinc-800"
          placeholder="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <input
          className="w-full border rounded-md px-2 mb-2 bg-white/30  p-1 border-white/50 shadow-white-md outline-0 text-zinc-800"
          placeholder="phone number"
          value={phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
        />

        <input
          className="w-full border rounded-md px-2 mb-2 bg-white/30  p-1 border-white/50 shadow-white-md outline-0 text-zinc-800"
          placeholder="password"
          value={userPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserPassword(e.target.value)
          }
        />
        <input
          className="w-full border rounded-md px-2 mb-2 bg-white/30  p-1 border-white/50 shadow-white-md outline-0 text-zinc-800"
          placeholder="repeat password"
          value={repeatPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRepeatPassword(e.target.value)
          }
        />
        <div className="flex justify-between">
          <button
            className="flex  underline text-sm text-zinc-800 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-97"
            onClick={() => {
              setFormLogIn(true);
              setFormSignUp(false);
            }}
          >
            Log in
          </button>
          {blankFields && (
            <p className="flex justify-end text-xs text-red-800">
              Please fill in all required fields!
            </p>
          )}
        </div>

        <Button text="Sign up" onClick={handleSignUp} />
      </div>
    </div>
  );
}
