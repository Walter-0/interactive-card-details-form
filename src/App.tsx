import React, { useState } from "react";
import cardLogo from "./images/card-logo.svg";
import bgMainMobile from "./images/bg-main-mobile.png";

function App() {
  const [cardNumber, setCardNumber] = useState("1234567887654321");
  const [cardholder, setCardholder] = useState("Jane Appleseed");
  const [month, setMonth] = useState("00");
  const [year, setYear] = useState("00");
  const [cvc, setCvc] = useState("000");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleCardholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardholder(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const isEmpty = (str: string) => {
    return str === "";
  };

  const isCardNumberValid = (str: string) => {
    return str.length === 16;
  };

  const isMonthValid = (str: string) => {
    return str.length === 2 && parseInt(str) <= 12;
  };

  const isYearValid = (str: string) => {
    return str.length === 2 && parseInt(str) >= 23;
  };

  const isCvcValid = (str: string) => {
    return str.length === 3;
  };

  return (
    <div className="App relative">
      <img src={bgMainMobile} alt="" />

      <div className="absolute left-4 top-32 z-10 flex h-[155px] w-[285px] flex-col justify-between bg-card-front bg-cover p-5">
        <img src={cardLogo} className="w-14" alt="card logo" />

        <div className="flex flex-col space-y-3">
          <div className="text-[18px] tracking-widest text-white">
            <span>{cardNumber.slice(0, 4)}</span>
            &nbsp;
            <span>{cardNumber.slice(4, 8)}</span>
            &nbsp;
            <span>{cardNumber.slice(8, 12)}</span>
            &nbsp;
            <span>{cardNumber.slice(12)}</span>
          </div>

          <div className="flex justify-between text-xs tracking-wider text-white">
            <span className="uppercase">{cardholder}</span>
            <span>
              {month}/{year}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-8 h-[155px] w-[285px] bg-card-back bg-cover">
        <span className="absolute right-9 top-[69px] text-xs tracking-wide text-white">
          {cvc}
        </span>
      </div>

      <div className="mt-16 px-4">
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="cardholder"
              className="mb-2 block text-xs uppercase tracking-wider"
            >
              Cardholder name
            </label>
            <input
              type="text"
              name="cardholder"
              id="cardholder"
              placeholder="Jane Appleseed"
              className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
              onChange={(e) => handleCardholderChange(e)}
            />
          </div>

          <div>
            <label
              htmlFor="cardnumber"
              className="mb-2 block text-xs uppercase tracking-wider"
            >
              Card Number
            </label>
            <input
              type="text"
              name="cardnumber"
              id="cardnumber"
              placeholder="0000 0000 0000 0000"
              className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
              onChange={(e) => handleCardNumberChange(e)}
            />
          </div>

          <div className="flex flex-row space-x-4">
            <div className="flex w-1/2 flex-col">
              <label className="mb-2 text-xs uppercase tracking-wider">
                Exp. Date (mm/yy)
              </label>

              <div className="flex flex-row space-x-2">
                <input
                  type="text"
                  name="month"
                  placeholder="MM"
                  className="w-1/2 rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                  onChange={(e) => handleMonthChange(e)}
                />

                <input
                  type="text"
                  name="year"
                  placeholder="YY"
                  className="w-1/2 rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                  onChange={(e) => handleYearChange(e)}
                />
              </div>
            </div>

            <div className="flex w-1/2 flex-col">
              <label className="mb-2 text-xs tracking-wider" htmlFor="cvc">
                CVC
              </label>
              <input
                type="text"
                name="cvc"
                id="cvc"
                placeholder="000"
                className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                onChange={(e) => handleCvcChange(e)}
              />
            </div>
          </div>

          <button
            className="rounded-md bg-very-dark-violet p-3 text-white"
            type="submit"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
