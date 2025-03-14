"use client";
import {useState} from "react";


const DonationForm = () => {
    const [amount, setAmount] = useState(10);
    const [paymentType, setPaymentType] = useState("payment");
    const [actionUrl, setActionUrl] = useState("");
    const [showOtherInput, setShowOtherInput] = useState(false);
    const disablePayment = process.env.NEXT_PUBLIC_REACT_DISABLE_PAYMENT === 'true';
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(actionUrl, {
                method: "POST",
                body: JSON.stringify({
                    paymentType: paymentType,
                    amount: amount,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                window.location.href = data.url;
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form onSubmit={handleSubmit} method="POST" className="m-auto">
            <fieldset
                id="paymentType"
                className=" mt-4  rounded-lg  w-full sm:w-96 flex py-2 bg-basecolor justify-around cursor-pointer"
                onChange={(e) => {
                    // @ts-ignore
                    setPaymentType(e.target?.value);
                }}
            >
                <input
                    type="radio"
                    id="oneOff"
                    name="paymentType"
                    value="payment"
                    defaultChecked
                    className="hidden peer/oneOff"
                />
                <label
                    htmlFor="oneOff"
                    className="cursor-pointer w-32 text-center font-bold p-2 rounded-lg peer-checked/oneOff:bg-foreground peer-checked/oneOff:text-white"
                >
                    One-Time
                </label>

                <input
                    type="radio"
                    id="sub"
                    name="paymentType"
                    value="subscription"
                    className="hidden peer/subscription"
                />
                <label
                    htmlFor="sub"
                    className="cursor-pointer w-32 font-bold p-2 text-center rounded-lg peer-checked/subscription:bg-foreground peer-checked/subscription:text-white"
                >
                    Monthly
                </label>
            </fieldset>

            <fieldset
                id="amount"
                className="flex gap-5 mt-8 flex-wrap cursor-pointer"
            >
                <input
                    type="radio"
                    id="amountFive"
                    name="amount"
                    value={5}
                    checked={amount === 5}
                    onChange={(e) => {
                        setAmount(5);
                    }}
                    className="hidden peer/amountFive"
                    onClick={() => {
                        setShowOtherInput(false);
                    }}
                />
                <label
                    htmlFor="amountFive"
                    className=" cursor-pointer peer-checked/amountFive:bg-foreground peer-checked/amountFive:text-white  bg-basecolor text-black font-bold rounded-2xl py-1 text-center w-20"
                >
                    £5
                </label>
                <input
                    type="radio"
                    id="amountTen"
                    name="amount"
                    value={10}
                    checked={amount === 10}
                    onChange={(e) => {
                        setAmount(10);
                    }}
                    className="hidden peer/amountTen"
                />
                <label
                    htmlFor="amountTen"
                    onClick={() => {
                        setShowOtherInput(false);
                    }}
                    className="cursor-pointer peer-checked/amountTen:bg-foreground peer-checked/amountTen:text-white   bg-basecolor text-black font-bold rounded-2xl py-1 text-center w-20"
                >
                    £10
                </label>

                <input
                    type="radio"
                    id="amountTwenty"
                    name="amount"
                    value={20}
                    checked={amount === 20}
                    onChange={() => {
                        setAmount(20);
                    }}
                    className="hidden peer/amountTwenty"
                    onClick={() => {
                        setShowOtherInput(false);
                    }}
                />
                <label
                    htmlFor="amountTwenty"
                    className="cursor-pointer peer-checked/amountTwenty:bg-foreground peer-checked/amountTwenty:text-white  bg-basecolor text-black font-bold rounded-2xl py-1 text-center w-20"
                >
                    £20
                </label>
                <label
                    htmlFor="amountOther"
                    onClick={() => {
                        setShowOtherInput(true);
                        setAmount(0);
                    }}
                    className={`${
                        !showOtherInput
                            ? "bg-basecolor text-black"
                            : "bg-foreground text-white"
                    } cursor-pointer  font-bold rounded-2xl py-1 text-center w-20`}
                >
                    Other
                </label>
            </fieldset>

            <div
                className={` ${
                    showOtherInput ? "" : "hidden"
                } w-full sm:w-96 mt-4 bg-basecolor text-black   font-bold rounded-lg py-2 px-4`}
            >
                <span>£</span>
                <input
                    type="number"
                    id="amountOther"
                    name="amount"
                    onChange={(e) => {
                        setAmount(parseInt(e.target.value));
                    }}
                    min={1}
                    //defaultValue={1.0}
                    placeholder={'1'}
                    className="bg-transparent focus-visible:outline-none"
                />
            </div>

            <div className="w-full sm:w-96 grid sm:grid-cols-2 grid-cols-1 gap-4">
                <button
                    disabled={disablePayment}
                    type="submit"
                    onClick={() => setActionUrl("/api/checkout_sessions_stripe")}
                    className="mt-8 rounded-lg hover:scale-110 text-foregroundLightText  py-2  bg-foreground  flex gap-4 justify-center items-center"
                >
                    Credit or Debit Card
                </button>
                <button
                    disabled={disablePayment}
                    type="submit"
                    onClick={() => setActionUrl("/api/checkout_sessions_paypal")}
                    className="mt-8 rounded-lg hover:scale-110 text-white py-2 hover:bg-[#0070e0]  bg-[#003087] flex gap-2 justify-center items-center"
                >
              <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    width="25"
                    height="25"
                    viewBox="0 0 384 512"
                >
                  <path
                      d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"/>
                </svg>
              </span>
                    PayPal
                </button>
            </div>
        </form>

    )
}

export default DonationForm