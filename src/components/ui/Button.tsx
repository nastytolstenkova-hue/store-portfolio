export interface ButtonParam extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export default function Button({ text, className, ...rest }: ButtonParam) {
  const butDes = "flex justify-center items-center mx-auto my-2 p-1 uppercase bg-zinc-300/30  shadow-[0_0_25px_5px_rgba(255,180,0,0.4)]  rounded-xl cursor-pointer whitespace-nowrap hover:bg-amber-400/50 hover:shadow-[0_0_40px_10px_rgba(255,180,0,0.6)] hover:text-white   duration-300 active:scale-95 transition-all "
  return (
    <button
      className={`${className} ${butDes}`}
      {...rest}
    >
      {text}
    </button>
  );
}
