import { useState } from "react"
import UseProductContext from "../../hooks/UseProductContext";
import { type UserInfo } from "../../store/ProductsContext";

export default function ProfileSettings(){
  const {userInfo, setUserInfo} = UseProductContext()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  
  const [user, setUser] = useState<UserInfo>(userInfo)
  const [templateUsData, setTemplateUsData] = useState<UserInfo>(userInfo)

  const handleCancel = () => {
    setUser(templateUsData);
    setIsEdit(false)
  }

  const handleSave = () => {
    setUserInfo(user)
    setTemplateUsData(user);
    setIsEdit(false)
  }
  
  const inputDesign = isEdit 
  ? 'border-yellow-500 bg-white shadow-sm rounded-full border w-[60%] px-3 transition-all' 
  : 'border-zinc-300 bg-zinc-100/50 cursor-not-allowed rounded-full border w-[60%] px-3 transition-all'
  ;
  return (
    <div className="border border-zinc-400 bg-amber-100/20 rounded-md py-2 px-3">
      <h2 className="m-2 text-xl">Account Basics</h2>
      <div className="border border-zinc-400 rounded-md p-2 m-2">
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">User Name</p>
          <input disabled={!isEdit} className={inputDesign} placeholder="Write User Name here" type='text' value={user.userName} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUser({...user, userName: e.target.value})}/>
        </div>
        <div className="flex justify-between my-2 ">
          <p className="line-clamp-1 text-nowrap text-sm">Email Adress</p>
          <input disabled={!isEdit} className={inputDesign} placeholder="Write email here" type='email' value={user.email} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUser({...user, email: e.target.value})}/>
        </div>
        <button className="flex justify-center items-center mx-auto my-3 mb-2 px-2 py-0.5 uppercase border text-white border-zinc-300 bg-zinc-400/30 rounded-xl cursor-pointer whitespace-nowrap hover:bg-zinc-500/40  transition-colors duration-300 active:scale-95 ">Request Email Change</button>
      </div>
       <div className="border border-zinc-400 rounded-md p-2 m-2">
        <h3 className=" text-xl">Contact & Details</h3>
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Phone Number</p>
          <input disabled={!isEdit} className={inputDesign} type='text' placeholder="Write your phone" value={user.phone} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUser({...user, phone: e.target.value})}/>
        </div>
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Date of Birth</p>
          <input className={inputDesign} type='date' placeholder="Date of Birth" disabled={!isEdit} value={user.birthDate} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUser({...user, birthDate: e.target.value})}/>
        </div>
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Preferred Contact Method</p>
          <select disabled={!isEdit} name='contactMethod' id='contactMethod' value={user.contactMethod} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUser({ ...userInfo, contactMethod: e.target.value })}>
            <option>Phone Call</option>
            <option>Email</option>
            <option>Sms</option>
          </select>
        </div>
      </div>
      <div className="border border-zinc-400 rounded-md p-2 m-2">
        <h3 className=" text-xl">Password & Security</h3>
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Current Password</p>
          <input disabled={!isEdit} className={inputDesign} type='password'/>
        </div>
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">New Password</p>
          <input disabled={!isEdit} className={inputDesign} type='password'/>
        </div>
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Confirm New Password</p>
          <input disabled={!isEdit} className={inputDesign} type='password' />
        </div>
      </div>
      <div className="flex justify-between my-2 m-2 ">
        <button type="button" onClick={()=>setIsEdit((prevVal)=>!prevVal)} className="flex justify-center items-center mx-auto my-3 w-[60%] mb-2 p-1 uppercase border border-zinc-300 shadow-[0_0_10px_2px_rgba(255,180,0,0.5)] bg-yellow-500/20 rounded-xl cursor-pointer whitespace-nowrap hover:bg-yellow-500/30  transition-colors duration-300 active:scale-95 ">{isEdit ? 'Save' : 'Change information'}</button>
        {isEdit && <button type="button" onClick={handleCancel}>Cancel</button>}
        
      </div>
    </div>
  )
}