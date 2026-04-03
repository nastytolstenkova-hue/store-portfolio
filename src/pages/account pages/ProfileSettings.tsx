import { useState } from "react";
import UseProductContext from "../../hooks/UseProductContext";
import { type UserInfo } from "../../store/ProductsContext";
import Button from "../../components/ui/Button";

export default function ProfileSettings() {
  const { userInfo, setUserInfo } = UseProductContext();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("12345qwert.");
  const [inputPassw, setInputPassw] = useState({
    curPas: "",
    newPas: "",
    repeatNewPas: "",
  });
  const [passError, setPassError] = useState<string>("");
  const [user, setUser] = useState<UserInfo>(userInfo);
  const [templateUsData, setTemplateUsData] = useState<UserInfo>(userInfo);
  const [isChangePassw, setIsChangePassw] = useState<boolean>(false);

  const handleChangePassw = () => {
    setPassError("");

    if (password !== inputPassw.curPas) {
      setPassError("Current password is incorrect.");
      return;
    }

    if (inputPassw.newPas !== inputPassw.repeatNewPas) {
      setPassError("New passwords do not match.");
      return;
    }

    if (inputPassw.newPas.length < 6) {
      setPassError("Password must be at least 6 characters.");
      return;
    }

    setPassword(inputPassw.newPas);
    setIsChangePassw(false);
    setInputPassw({ curPas: "", newPas: "", repeatNewPas: "" });
    setPassError("Success!");
    setTimeout(() => {
      setPassError("");
    }, 5000);
  };

  const handleCancel = () => {
    setUser(templateUsData);
    setIsEdit(false);
  };

  const handleSave = () => {
    setUserInfo(user);
    setTemplateUsData(user);
    setIsEdit(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputDesign = isEdit
    ? "border-yellow-500 bg-white shadow-sm rounded-full border w-[60%] px-3 transition-all"
    : "border-zinc-300 bg-zinc-100/50 cursor-default rounded-full border w-[60%] px-3 transition-all";
  return (
    <div className="border border-zinc-400 bg-amber-100/20 rounded-md py-2 px-3 cursor-default">
      <h2 className="m-2 text-xl">Account Basics</h2>
      <div className="border border-zinc-400 rounded-md p-2 m-2">
        <label className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">User Name</p>
          <input
            name="userName"
            disabled={!isEdit}
            className={inputDesign}
            placeholder="Write User Name here"
            type="text"
            value={user.userName}
            onChange={handleChange}
          />
        </label>
        <label className="flex justify-between my-2 ">
          <p className="line-clamp-1 text-nowrap text-sm">Email Address</p>
          <input
            name="email"
            disabled={!isEdit}
            className={inputDesign}
            placeholder="Write email here"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <button className="flex justify-center items-center mx-auto my-3 mb-2 px-2 py-0.5 uppercase border text-white border-zinc-300 bg-zinc-400/30 rounded-xl cursor-pointer whitespace-nowrap hover:bg-zinc-500/40  transition-colors duration-300 active:scale-95 ">
          Request Email Change
        </button>
      </div>
      <div className="border border-zinc-400 rounded-md p-2 m-2">
        <h3 className=" text-xl">Contact & Details</h3>
        <label className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Phone Number</p>
          <input
            name="phone"
            disabled={!isEdit}
            className={inputDesign}
            type="text"
            placeholder="Write your phone"
            value={user.phone}
            onChange={handleChange}
          />
        </label>
        <label className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Date of Birth</p>
          <input
            name="birthDate"
            className={inputDesign}
            type="date"
            placeholder="Date of Birth"
            disabled={!isEdit}
            value={user.birthDate}
            onChange={handleChange}
          />
        </label>
        <label className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">
            Preferred Contact Method
          </p>
          <select
            disabled={!isEdit}
            name="contactMethod"
            id="contactMethod"
            value={user.contactMethod}
            onChange={handleChange}
          >
            <option>Phone Call</option>
            <option>Email</option>
            <option>Sms</option>
          </select>
        </label>
      </div>
      <div className="border border-zinc-400 rounded-md p-2 m-2">
        <h3 className=" text-xl">Password & Security</h3>
        <label className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Current Password</p>
          <input
            disabled={!isEdit}
            className={inputDesign}
            type="password"
            value={inputPassw.curPas}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputPassw((prevVal) => ({
                ...prevVal,
                curPas: e.target.value,
              }))
            }
          />
        </label>
        <label className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">New Password</p>
          <input
            disabled={!isEdit}
            className={inputDesign}
            type="password"
            value={inputPassw.newPas}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputPassw((prevVal) => ({
                ...prevVal,
                newPas: e.target.value,
              }))
            }
          />
        </label>
        <label className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">
            Confirm New Password
          </p>
          <input
            disabled={!isEdit}
            className={inputDesign}
            type="password"
            value={inputPassw.repeatNewPas}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputPassw((prevVal) => ({
                ...prevVal,
                repeatNewPas: e.target.value,
              }))
            }
          />
        </label>
        {passError && (
          <p
            className={`${passError === "Success!" ? "text-green-600" : "text-red-500"} text-xs mt-1`}
          >
            {passError}
          </p>
        )}
        <button
          className="flex justify-center items-center mx-auto my-3 mb-2 px-2 py-0.5 uppercase border text-white border-zinc-300 bg-zinc-400/30 rounded-xl cursor-pointer whitespace-nowrap hover:bg-zinc-500/40  transition-colors duration-300 active:scale-95 "
          onClick={() =>
            isChangePassw ? handleChangePassw() : setIsChangePassw(true)
          }
        >
          {!isChangePassw ? "Change Password" : "Save"}
        </button>
      </div>
      <div className="flex justify-between my-2 m-2 ">
        <Button
          text={isEdit ? "Save" : "Change information"}
          type="button"
          className="w-[60%] "
          onClick={handleSave}
        />
      </div>

      {isEdit && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </div>
  );
}
