"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const DonationsModalSuccess = () => {
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams?.get("success");
  useEffect(() => {
    setShowModal(!!search);
  }, [search]);
  return (
    <div
      id="popup-modal"
      className={`${
        showModal ? "flex" : "hidden"
      } bg-overlay overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow text-center">
          <div className="flex items-center justify-center bg-lime-500 p-8 rounded-t-lg">
            <svg
              width="60"
              height="60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill={"white"}
            >
              <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z" />
            </svg>
          </div>

          <div className="px-8 pb-8 pt-4">
            <h2 className="font-bold text-2xl my-4">
              Donation Payment Successful
            </h2>
            <p>
              Thank you for you generous donation - your support is make a real
              difference!
            </p>

            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="rounded-3xl font-bold text-white bg-lime-500 w-24 mt-8 p-2"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DonationsModalSuccessOuter = () => {
  return (
    <Suspense>
      <DonationsModalSuccess />
    </Suspense>
  );
};

export default DonationsModalSuccessOuter;
