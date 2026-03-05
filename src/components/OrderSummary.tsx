export default function OrderSummary(){
  return (
    <div className="flex flex-col cursor-default hover:cursor-default">
      <h2 className="flex justify-center uppercase mb-2">order summary</h2>
      <div className="flex justify-between mb-1">
        <p>Subtotal (3 items):</p>
        <p>$ 1000</p>
      </div>
      <div className="flex justify-between mb-1">
        <p>Shiping:</p>
        <p>$ 10</p>
      </div>
      <div className="h-[1px] mx-1 my-2 bg-zinc-300"></div>
      <div className="flex justify-between mb-1 text-xl">
        <p>Total:</p>
        <p>$ 1000</p>
      </div>
      <button className="flex justify-center items-center mx-auto my-3 mb-2 p-1 uppercase border border-zinc-300 shadow-[0_0_10px_2px_rgba(255,180,0,0.5)] bg-zinc-300/30 rounded-xl cursor-pointer whitespace-nowrap hover:bg-zinc-300/40  transition-colors duration-300 active:scale-95 ">Proceed to checkout</button>
      <button className="underline text-sm text-zinc-600 cursor-pointer hover:text-black  transition-colors duration-300 active:scale-95">continue shopping</button>
    </div>
  )
}