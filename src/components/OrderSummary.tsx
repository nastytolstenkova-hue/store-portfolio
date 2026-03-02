export default function OrderSummary(){
  return (
    <div className="flex flex-col">
      <h2>order summary</h2>
      <div className="grid grid-cols-2">
        <p>Subtotal (3 items):</p>
        <p>$ 1000</p>
      </div>
      <div className="grid grid-cols-2">
        <p>Shiping:</p>
        <p>$ 10</p>
      </div>
      <div className="grid grid-cols-2">
        <p>Total:</p>
        <p>$ 1000</p>
      </div>
      <button>Proceed to checkout</button>
      <button>continue shopping</button>
    </div>
  )
}