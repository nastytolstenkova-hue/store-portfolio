export default function ShippingAddress() {
  const inputDes = "w-full border rounded-md px-2 bg-white mb-2";
  return (
    <div className="flex flex-col bg-amber-200/40 w-fit p-3 rounded-md border border-zinc-500/40">
      <h3 className="text-xl mb-5">Shipping Address</h3>
      <input className={`${inputDes}`} placeholder="Full Name" />
      <p>Street Address</p>
      <input className={`${inputDes}`} placeholder="Street" />
      <input className={`${inputDes}`} placeholder="House number" />
      <input className={`${inputDes}`} placeholder="Apartment number" />
      <input className={`${inputDes}`} placeholder="City" />
      <input className={`${inputDes}`} placeholder="Postal code" />
      <div className="flex flex-col ">
        <p>Shipping Method</p>
        <div className="flex gap-2 items-center">
          <input type='checkbox' />
          <p>
            Standard Delivery <span>Free, 5-7 days</span>
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <input type='checkbox'/>
          <p>
            Express Delivery <span>$25, 2-3 days</span>
          </p>
        </div>
      </div>
    </div>
  );
}
