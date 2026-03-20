export default function ProfileSettings(){
  const inputDesighn = 'rounded-full border border-zinc-500 w-[60%] px-3'
  return (
    <div className="border border-zinc-400 bg-amber-100/20 rounded-md py-2 px-3">
      <h2 className="m-2 text-xl">Account Basics</h2>
      <div className="border border-zinc-400 rounded-md p-2 m-2">
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">User Name</p>
          <input className={inputDesighn} placeholder="Write User Name here" type='text'/>
        </div>
        <div className="flex justify-between my-2 ">
          <p className="line-clamp-1 text-nowrap text-sm">Email Adress</p>
          <input className={inputDesighn} placeholder="Write email here" type='email'/>
        </div>
        <button className="flex justify-center items-center mx-auto my-3 mb-2 px-2 py-0.5 uppercase border text-white border-zinc-300 bg-zinc-500/40 rounded-xl cursor-pointer whitespace-nowrap hover:bg-zinc-500/50  transition-colors duration-300 active:scale-95 ">Request Email Change</button>
      </div>
       <div className="border border-zinc-400 rounded-md p-2 m-2">
        <h3 className=" text-xl">Contact & Details</h3>
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Phone Number</p>
          <input className={inputDesighn} type='text' placeholder="Write your phone"/>
        </div>
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Date of Birth</p>
          <input className={inputDesighn} type='date' placeholder="Date of Birth"/>
        </div>
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Preferred Contact Method</p>
          <select name='contactMethod' id='contactMethod'>
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
          <input className={inputDesighn} type='password'/>
        </div>
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">New Password</p>
          <input className={inputDesighn} type='password'/>
        </div>
        <div className="flex justify-between my-2">
          <p className="line-clamp-1 text-nowrap text-sm">Confirm New Password</p>
          <input className={inputDesighn} type='password'/>
        </div>
      </div>
      <div className="flex justify-between my-2 m-2 ">
        <button className="flex justify-center items-center mx-auto my-3 w-[60%] mb-2 p-1 uppercase border border-zinc-300 shadow-[0_0_10px_2px_rgba(255,180,0,0.5)] bg-yellow-500/20 rounded-xl cursor-pointer whitespace-nowrap hover:bg-yellow-500/30  transition-colors duration-300 active:scale-95 ">save changes</button>
        <button>Cancel</button>
      </div>
    </div>
  )
}