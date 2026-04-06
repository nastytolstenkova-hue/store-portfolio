import amex from "../../image/paymentMethod/amex.png";
import card from "../../image/paymentMethod/card.png";
import visa from "../../image/paymentMethod/visa.png";

import { useState } from "react";

export default function PaymentMethodComp() {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [typeCard, setTypeCard] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [isCvvValid, setIsCvvValid] = useState<boolean>(true);
  

  const getCardType = (number: string) => {
    const firstDigit = number[0];
    const firstTwoDigits = number.substring(0, 2);

    if (firstDigit === "4") return "Visa";
    if (parseInt(firstTwoDigits) >= 51 && parseInt(firstTwoDigits) <= 55)
      return "Mastercard";
    if (firstTwoDigits === "34" || firstTwoDigits === "37")
      return "American Express";
    return " ";
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const currentType = getCardType(digits);
    let limited;
    if (currentType === "American Express") {
      limited = digits.substring(0, 15);
    } else {
      limited = digits.substring(0, 16);
    }

    return limited.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const validateLuhn = (cardNumber: string): boolean => {
    const digits = cardNumber.replace(/\s/g, "");

    if (digits.length < 13) return false;

    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let digit = parseInt(digits[i]);
      if ((digits.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setTypeCard(getCardType(formatted));
    setCardNumber(formatted);

    if (
      formatted.replace(/\s/g, "").length === 15 &&
      typeCard === "American Express"
    ) {
      setIsValid(validateLuhn(formatted));
      return;
    }

    if (formatted.replace(/\s/g, "").length === 16) {
      setIsValid(validateLuhn(formatted));
    } else {
      setIsValid(true);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    const requiredLength = typeCard === "American Express" ? 4 : 3;

    const limitedValue = value.substring(0, requiredLength);
    setCvv(limitedValue);

    if (limitedValue.length === requiredLength) {
      setIsCvvValid(true);
    } else if (limitedValue.length > 0) {
      setIsCvvValid(false);
    }
  };

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
        <p>{typeCard}</p>
        <input
          type="text"
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChange={handleChange}
          className="w-full border rounded-md px-2 bg-white mb-2"
        />
        {!isValid && (
          <span className="text-xs text-red-500">Invalid card number</span>
        )}
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
            type="text"
            placeholder="000"
            value={cvv}
            onChange={handleCvvChange}
            className="w-full border rounded-md px-2 bg-white mb-2"
          />
          {!isCvvValid && (
            <span className="text-[10px] text-red-500 block">
              Required: {typeCard === "American Express" ? "4" : "3"} digits
            </span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[5fr_1fr_5fr] items-center my-3">
        <div className="border-b mx-2 "></div>
        <p>Or</p>
        <div className="border-b mx-2"></div>
      </div>
      <button className="bg-amber-400 rounded-md font-bold text-xl font-sans cursor-pointer  hover:bg-amber-500 duration-300 active:scale-95 transition-all">
        <span className="text-blue-950">Pay</span>
        <span className="text-cyan-500">Pal</span>
      </button>
    </div>
  );
}
