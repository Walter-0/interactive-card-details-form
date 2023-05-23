import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import bgMainMobile from "./images/bg-main-mobile.png";
import bgMainDesktop from "./images/bg-main-desktop.png";
import iconComplete from "./images/icon-complete.svg";
import cardLogo from "./images/card-logo.svg";
import amexLogo from "./images/amex-logo.svg";
import visaLogo from "./images/visa-logo.svg";
import mastercardLogo from "./images/mastercard-logo.svg";
import discoverLogo from "./images/discover-logo.svg";

// add types to this object
const logos: { [key: string]: string } = {
  blank: cardLogo,
  amex: amexLogo,
  visa: visaLogo,
  mastercard: mastercardLogo,
  discover: discoverLogo,
};

interface IFormInputs {
  cardholderName: string;
  cardnumber: string;
  month: string;
  year: string;
  cvc: string;
}

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInputs>();

  const [cardNumber, setCardNumber] = useState("");
  const [cardNetwork, setCardNetwork] = useState("blank"); // ["amex", "visa", "mastercard", "discover"]
  const [cardholderName, setCardholderName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");

  const [isCompleted, setIsCompleted] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);

    switch (e.target.value[0]) {
      case "3":
        setCardNetwork("amex");
        break;
      case "4":
        setCardNetwork("visa");
        break;
      case "5":
        setCardNetwork("mastercard");
        break;
      case "6":
        setCardNetwork("discover");
        break;
      default:
        setCardNetwork("blank");
        break;
    }
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

  const onSubmit = (data: IFormInputs) => {
    setIsCompleted(true);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

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
        <img src={logos[cardNetwork]} alt="card logo" className="w-14" />

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
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="cardholderName"
                className="mb-2 block text-xs uppercase tracking-widest lg:text-sm"
              >
                Cardholder name
              </label>
              <input
                {...register("cardholderName", { required: "Can't be blank" })}
                type="text"
                name="cardholderName"
                id="cardholderName"
                placeholder="Jane Appleseed"
                className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                onChange={(e) => handleCardholderChange(e)}
              />
              <p className="text-xs text-red lg:text-sm">
                {errors.cardholderName?.message}
              </p>
            </div>

            <div>
              <label
                htmlFor="cardnumber"
                className="mb-2 block text-xs uppercase tracking-widest lg:text-sm"
              >
                Card Number
              </label>
              <input
                {...register("cardnumber", {
                  required: "Can't be blank",
                  maxLength:
                    cardNetwork === "amex"
                      ? { value: 15, message: "Must be 15 digits" }
                      : { value: 16, message: "Must be 16 digits" },
                  minLength:
                    cardNetwork === "amex"
                      ? { value: 15, message: "Must be 15 digits" }
                      : { value: 16, message: "Must be 16 digits" },
                  pattern: { value: /^\d+$/, message: "Must be a number" },
                })}
                type="text"
                name="cardnumber"
                id="cardnumber"
                placeholder="0000 0000 0000 0000"
                maxLength={cardNetwork === "amex" ? 15 : 16}
                className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                onChange={(e) => handleCardNumberChange(e)}
              />
              <p className="text-xs text-red lg:text-sm">
                {errors.cardnumber?.message}
              </p>
            </div>

            <div className="flex flex-row space-x-4">
              <div className="flex w-1/2 flex-col">
                <label className="mb-2 text-xs uppercase tracking-widest lg:text-sm">
                  Exp. Date (mm/yy)
                </label>

                <div className="flex flex-row space-x-2">
                  <div className="w-1/2">
                    <input
                      {...register("month", {
                        required: "Can't be blank",
                        maxLength: { value: 2, message: "Must be 2 digits" },
                        minLength: { value: 2, message: "Must be 2 digits" },
                        pattern: {
                          value: /^\d+$/,
                          message: "Must be a number",
                        },
                      })}
                      type="text"
                      name="month"
                      placeholder="MM"
                      maxLength={2}
                      className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                      onChange={(e) => handleMonthChange(e)}
                    />
                    <p className="text-xs text-red lg:text-sm">
                      {errors.month?.message}
                    </p>
                  </div>

                  <div className="w-1/2">
                    <input
                      {...register("year", {
                        required: "Can't be blank",
                        maxLength: { value: 2, message: "Must be 2 digits" },
                        minLength: { value: 2, message: "Must be 2 digits" },
                        pattern: {
                          value: /^\d+$/,
                          message: "Must be a number",
                        },
                      })}
                      type="text"
                      name="year"
                      placeholder="YY"
                      maxLength={2}
                      className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                      onChange={(e) => handleYearChange(e)}
                    />
                    <p className="text-xs text-red lg:text-sm">
                      {errors.year?.message}
                    </p>
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
                  {...register("cvc", {
                    required: "Can't be blank",
                    maxLength:
                      cardNetwork === "amex"
                        ? { value: 4, message: "Must be 4 digits" }
                        : { value: 3, message: "Must be 3 digits" },
                    minLength:
                      cardNetwork === "amex"
                        ? { value: 4, message: "Must be 4 digits" }
                        : { value: 3, message: "Must be 3 digits" },
                    pattern: { value: /^\d+$/, message: "Must be a number" },
                  })}
                  type="text"
                  name="cvc"
                  id="cvc"
                  placeholder="000"
                  maxLength={cardNetwork === "amex" ? 4 : 3}
                  className="w-full rounded-md border border-gray-300 p-3 invalid:border-red focus:outline-none focus:ring-2 focus:ring-brilliant-blue"
                  onChange={(e) => handleCvcChange(e)}
                />
                <p className="text-xs text-red lg:text-sm">
                  {errors.cvc?.message}
                </p>
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
