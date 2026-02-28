import baner from '../image/main-baner.jpg'

export default function Baner(){


  return (
    <div style={{ backgroundImage: `url(${baner})` }} className={`font-mono w-[95%] h-72  bg-cover bg-center flex items-center justify-center text-white mx-auto`}>
      <div className="bg-white/30  p-2 rounded-2xl border border-white/30">
        <h1 className='text-5xl flex justify-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]'>Your light</h1>
        <h2 className='text-2xl flex justify-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]'>Light is the soul of the house.</h2>

      </div>
      
    </div>
  )

}