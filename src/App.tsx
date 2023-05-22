import React, { useState } from "react";
import cardLogo from "./images/card-logo.svg";
import bgMainMobile from "./images/bg-main-mobile.png";
import bgMainDesktop from "./images/bg-main-desktop.png";
import iconComplete from "./images/icon-complete.svg";

const isEmpty = (str: string) => {
  return str === "";
};

const isCardNumberValid = (str: string) => {
  // check if string is a 16 digit number
  return /^\d+$/.test(str) && str.length === 16;
};

const isMonthValid = (str: string) => {
  // check if string is a number between 1 and 12
  return (
    /^\d+$/.test(str) &&
    str.length === 2 &&
    parseInt(str) >= 1 &&
    parseInt(str) <= 12
  );
};

const isYearValid = (str: string) => {
  // check if string is a number greater than 23
  return /^\d+$/.test(str) && str.length === 2 && parseInt(str) >= 23;
};

const isCvcValid = (str: string) => {
  // check if string is a number
  return /^\d+$/.test(str) && str.length === 3;
};

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [cardholderNameError, setCardholderNameError] = useState("");
  const [month, setMonth] = useState("");
  const [monthError, setMonthError] = useState("");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState("");
  const [cvc, setCvc] = useState("");
  const [cvcError, setCvcError] = useState("");

  const [isCompleted, setIsCompleted] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleCardholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardholderName(e.target.value);
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

  // Validation
  const validateForm = () => {
    isEmpty(cardholderName)
      ? setCardholderNameError("Can't be blank")
      : setCardholderNameError("");

    isEmpty(cardNumber)
      ? setCardNumberError("Can't be blank")
      : !isCardNumberValid(cardNumber)
      ? setCardNumberError("Wrong format, numbers only")
      : setCardNumberError("");

    isEmpty(month)
      ? setMonthError("Can't be blank")
      : !isMonthValid(month)
      ? setMonthError("Invalid month")
      : setMonthError("");

    isEmpty(year)
      ? setYearError("Can't be blank")
      : !isYearValid(year)
      ? setYearError("Invalid year")
      : setYearError("");

    isEmpty(cvc)
      ? setCvcError("Can't be blank")
      : !isCvcValid(cvc)
      ? setCvcError("Invalid CVC")
      : setCvcError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    validateForm();
    if (
      [
        cardholderNameError,
        cardNumberError,
        monthError,
        yearError,
        cvcError,
      ].every((err) => err === "")
    ) {
      console.log("Form submitted");

      setIsCompleted(true);
      console.log(isCompleted);
    }
  };

  return (
    <div className="App relative lg:flex lg:flex-row">
      <img
        src={bgMainMobile}
        className="w-full lg:hidden"
        alt="mobile background"
      />
      <img
        src={bgMainDesktop}
        className="hidden lg:block lg:h-screen lg:w-[483px]"
        alt="desktop background"
      />

      <div className="absolute left-4 top-32 z-10 flex h-[155px] w-[285px] flex-col justify-between bg-card-front bg-cover p-5 lg:left-44 lg:top-44 lg:h-[245px] lg:w-[447px] lg:p-[30px]">
        <img src={cardLogo} className="w-14" alt="card logo" />

        <div className="flex flex-col space-y-3 lg:space-y-6">
          <div className="text-lg tracking-widest text-white lg:text-3xl">
            <span>{cardNumber.slice(0, 4)}</span>
            &nbsp;
            <span>{cardNumber.slice(4, 8)}</span>
            &nbsp;
            <span>{cardNumber.slice(8, 12)}</span>
            &nbsp;
            <span>{cardNumber.slice(12)}</span>
          </div>

          <div className="flex justify-between text-xs tracking-wider text-white lg:text-lg">
            <span className="uppercase">{cardholderName}</span>
            <span>
              {month}/{year}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-8 h-[155px] w-[285px] bg-card-back bg-cover lg:left-64 lg:right-auto lg:top-[460px] lg:h-[245px] lg:w-[447px]">
        <span className="absolute right-9 top-[69px] text-xs tracking-widest text-white lg:right-14 lg:top-[108px] lg:text-base">
          {cvc}
        </span>
      </div>

      <div className="mt-24 px-4 lg:m-auto lg:p-0">
        {!isCompleted ? (
          <form
            className="flex flex-col space-y-6 lg:w-[400px]"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="cardholder"
                className="mb-2 block text-xs uppercase tracking-widest lg:text-sm"
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
              {cardholderNameError && (
                <p className="text-xs text-red lg:text-sm">
                  {cardholderNameError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="cardnumber"
                className="mb-2 block text-xs uppercase tracking-widest lg:text-sm"
              >
                Card Number
              </label>
              <input
                type="text"
                name="cardnumber"
                id="cardnumber"
                placeholder="0000 0000 0000 0000"
                maxLength={16}
                className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                onChange={(e) => handleCardNumberChange(e)}
              />
              {cardNumberError && (
                <p className="text-xs text-red lg:text-sm">{cardNumberError}</p>
              )}
            </div>

            <div className="flex flex-row space-x-4">
              <div className="flex w-1/2 flex-col">
                <label className="mb-2 text-xs uppercase tracking-widest lg:text-sm">
                  Exp. Date (mm/yy)
                </label>

                <div className="flex flex-row space-x-2">
                  <div className="w-1/2">
                    <input
                      type="text"
                      name="month"
                      placeholder="MM"
                      maxLength={2}
                      className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                      onChange={(e) => handleMonthChange(e)}
                    />
                    {monthError && (
                      <p className="text-xs text-red lg:text-sm">
                        {monthError}
                      </p>
                    )}
                  </div>

                  <div className="w-1/2">
                    <input
                      type="text"
                      name="year"
                      placeholder="YY"
                      maxLength={2}
                      className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                      onChange={(e) => handleYearChange(e)}
                    />
                    {yearError && (
                      <p className="text-xs text-red lg:text-sm">{yearError}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex w-1/2 flex-col">
                <label
                  className="mb-2 text-xs tracking-widest lg:text-sm"
                  htmlFor="cvc"
                >
                  CVC
                </label>
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  placeholder="000"
                  maxLength={3}
                  className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                  onChange={(e) => handleCvcChange(e)}
                />
                {cvcError && (
                  <p className="text-xs text-red lg:text-sm">{cvcError}</p>
                )}
              </div>
            </div>

            <button
              className="rounded-md bg-very-dark-violet p-3 text-white lg:p-4"
              type="submit"
            >
              Confirm
            </button>
          </form>
        ) : (
          <div className="text-center lg:w-[400px]">
            <img
              src={iconComplete}
              className="mx-auto mb-8"
              alt="checkmark icon"
            />

            <h2 className="mb-4 text-2xl uppercase tracking-widest text-very-dark-violet">
              Thank you!
            </h2>

            <p className="mb-8 text-dark-grayish-violet">
              We've added your card details
            </p>

            <button
              className="w-full rounded-md bg-very-dark-violet p-3 text-white lg:p-4"
              onClick={() => setIsCompleted(false)}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
