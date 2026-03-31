import amex from "../../image/paymentMethod/amex.png";
import card from "../../image/paymentMethod/card.png";
import visa from "../../image/paymentMethod/visa.png";

export default function PaymentMethodComp() {
  return (
    <div className="flex flex-col bg-amber-200/40 w-fit p-3 rounded-md border border-zinc-500/40">
      <h3 className="text-xl mb-1">Payment Method</h3>
      <div className="flex gap-2">
        <img className="h-8 w-8" src={visa} alt="way to pay" />
        <img className="h-8 w-8" src={card} alt="way to pay" />
        <img className="h-8 w-8" src={amex} alt="way to pay" />
      </div>
      <div>
        <label className="text-sm whitespace-nowrap">Card Number</label>
        <input
          type=""
          className="w-full border rounded-md px-2 bg-white mb-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm whitespace-nowrap">Expiration Date</label>
          <input
            placeholder="MM/YY"
            className="w-full border rounded-md px-2 bg-white mb-2"
          />
        </div>
        <div>
          <label className="text-sm whitespace-nowrap">CVV</label>
          <input
            type=""
            className="w-full border rounded-md px-2 bg-white mb-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-[5fr_1fr_5fr] items-center">
        <div className="border-b mx-2"></div>
        <p>Or</p>
        <div className="border-b mx-2"></div>
      </div>
    </div>
  );
}
