import { useState } from "react";
import UseAuthContext from "../../hooks/UseAuthContext";
import Button from "../ui/Button";

export default function RegistrationForm() {
  const [userLogin, setUserLogin] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col bg-amber-200/40 p-3 pt-10 rounded-md border border-zinc-500/40 mb-3 relative  mx-3  dark:bg-zinc-800  shadow-amber-400/70  w-[50%]">
        <button
          type="button"
          className="text-amber-200 rounded-xs w-6 h-6 ml-7.5 absolute top-2 right-4  active:cursor-pointer hover:cursor-pointer hover:text-amber-300"
        >
          ✕
        </button>
        <input
          className="w-full border rounded-md px-2 mb-2 bg-white/30  p-1 border-white/50 shadow-white-md outline-0 text-zinc-800"
          placeholder="login"
          value={userLogin}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserLogin(e.target.value)
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
        <Button text="Sign up" />
      </div>
    </div>
  );
}
