import { Link } from "react-router-dom"

export default function ErrorPage(){
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-[22rem] font-bold text-zinc-100 leading-none select-none">
        404
      </h1>
      <div className="absolute flex flex-col items-center">
        <h2 className="text-zinc-800 font-mono font-bold text-5xl uppercase tracking-[0.2em] mb-4">Lost in the dark?</h2>
        <p className="text-zinc-500 max-w-md mb-8 font-light">
          The page you are looking for has dimmed or never existed. 
          Let’s find your way back to the catalog.
        </p>
        <Link 
          to="/" 
          className="px-10 py-4 bg-zinc-900 text-white uppercase text-sm tracking-widest rounded-full 
                     shadow-[0_0_25px_5px_rgba(255,180,0,0.4)] hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] 
                     transition-all duration-500 active:scale-95"
        >
          Back to light
        </Link>
      </div>
      
    </div>
      
   
  )
}